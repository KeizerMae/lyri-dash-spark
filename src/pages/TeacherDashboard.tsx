import { useEffect, useState } from "react";
import { BarChart, CalendarClock, GraduationCap, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type Classroom = {
  id: string;
  name: string;
  description?: string;
  students_count: number;
  avg_progress: number;
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const TeacherDashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeLessons: 0,
    completionRate: '0%',
    weekSessions: '0 sessions'
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch current user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('No authenticated user');
        }

        // Fetch profile details
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch teacher's classrooms
        const { data: classroomsData, error: classroomsError } = await supabase
          .from('classrooms')
          .select(`
            id,
            name,
            description,
            enrollments (
              count(*) as students_count,
              avg(progress) as avg_progress
            )
          `)
          .eq('teacher_id', user.id);

        if (classroomsError) throw classroomsError;
        
        // Transform classrooms data
        const transformedClassrooms = classroomsData.map(classroom => ({
          ...classroom,
          students_count: classroom.enrollments[0]?.students_count ?? 0,
          avg_progress: Math.round(classroom.enrollments[0]?.avg_progress ?? 0)
        }));
        setClassrooms(transformedClassrooms);

        // Fetch announcements
        const { data: announcementsData, error: announcementsError } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (announcementsError) throw announcementsError;
        setAnnouncements(announcementsData);

        // Calculate stats
        const totalStudents = transformedClassrooms.reduce((sum, classroom) => sum + classroom.students_count, 0);
        setStats({
          totalStudents,
          activeLessons: transformedClassrooms.length,
          completionRate: `${Math.round(transformedClassrooms.reduce((sum, c) => sum + c.avg_progress, 0) / transformedClassrooms.length)}%`,
          weekSessions: `${transformedClassrooms.length} sessions`
        });

      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        toast({
          title: 'Error',
          description: 'Could not load dashboard data',
          variant: 'destructive'
        });
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout userRole="teacher">
      <div className="p-6 pb-16">
        {/* Welcome header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {profile?.full_name || 'Teacher'}
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your classes today</p>
        </header>

        {/* Quick stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Students", value: stats.totalStudents, icon: UsersIcon, color: "bg-blue-500" },
            { label: "Active Lessons", value: stats.activeLessons, icon: GraduationCap, color: "bg-green-500" },
            { label: "Completion Rate", value: stats.completionRate, icon: BarChart, color: "bg-purple-500" },
            { label: "This Week", value: stats.weekSessions, icon: CalendarClock, color: "bg-amber-500" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Classrooms section */}
          <section className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your Classrooms</CardTitle>
                    <CardDescription>Manage your classes and track progress</CardDescription>
                  </div>
                  <Button className="bg-lyri-purple hover:bg-lyri-dark-purple">+ New Class</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {classrooms.map((classroom, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{classroom.name}</h4>
                        <span className="text-sm text-gray-500">{classroom.students_count} students</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <Progress value={classroom.avg_progress} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{classroom.avg_progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button size="lg" className="bg-lyri-purple hover:bg-lyri-dark-purple">Create Lesson</Button>
              <Button size="lg" variant="outline">View Progress Reports</Button>
            </div>
          </section>

          {/* Announcements section */}
          <section>
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Announcements</CardTitle>
                  <Button variant="ghost" size="sm">+ Add</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-lyri-light-purple' : 'bg-lyri-soft-blue'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(announcement.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
