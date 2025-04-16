
import { BarChart, CalendarClock, GraduationCap, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";

const TeacherDashboard = () => {
  // Mock data for dashboard
  const teacherName = "Alex Thompson";
  const stats = [
    { label: "Total Students", value: 85, icon: UsersIcon, color: "bg-blue-500" },
    { label: "Active Lessons", value: 12, icon: GraduationCap, color: "bg-green-500" },
    { label: "Completion Rate", value: "87%", icon: BarChart, color: "bg-purple-500" },
    { label: "This Week", value: "8 sessions", icon: CalendarClock, color: "bg-amber-500" }
  ];
  
  const classrooms = [
    { name: "Advanced Physics", students: 18, progress: 78 },
    { name: "Intro to Chemistry", students: 24, progress: 65 },
    { name: "Biology 101", students: 22, progress: 92 },
    { name: "Computer Science", students: 21, progress: 45 },
  ];

  const announcements = [
    { title: "Parent-Teacher Conference", date: "April 20, 2025", content: "Please prepare student progress reports for the upcoming parent-teacher conferences." },
    { title: "Curriculum Update", date: "April 18, 2025", content: "New AI-assisted learning modules will be available next week for the science department." },
    { title: "Staff Meeting", date: "April 22, 2025", content: "Don't forget about the staff meeting to discuss the end-of-year assessment strategies." }
  ];

  return (
    <DashboardLayout userRole="teacher">
      <div className="p-6 pb-16">
        {/* Welcome header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {teacherName}</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your classes today</p>
        </header>

        {/* Quick stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                        <span className="text-sm text-gray-500">{classroom.students} students</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <Progress value={classroom.progress} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{classroom.progress}%</span>
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
                    <div key={index} className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-lyri-light-purple' : 'bg-lyri-soft-blue'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <span className="text-xs text-gray-500">{announcement.date}</span>
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
