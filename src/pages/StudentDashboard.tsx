
import { BookOpen, Clock, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard = () => {
  // Mock data for student dashboard
  const studentName = "Jamie Wilson";
  
  const nextLesson = {
    title: "Chemical Reactions: Balancing Equations",
    subject: "Chemistry",
    time: "Today, 2:15 PM",
    duration: "45 minutes",
    teacher: "Dr. Carter"
  };
  
  const progressData = [
    { subject: "Chemistry", progress: 68, color: "bg-green-500" },
    { subject: "Physics", progress: 45, color: "bg-blue-500" },
    { subject: "Mathematics", progress: 92, color: "bg-purple-500" },
    { subject: "Biology", progress: 75, color: "bg-amber-500" }
  ];
  
  const assignments = [
    { title: "Chemical Bonds Essay", subject: "Chemistry", dueDate: "Apr 22, 2025", status: "In Progress" },
    { title: "Physics Problem Set #8", subject: "Physics", dueDate: "Apr 18, 2025", status: "Not Started" },
    { title: "Cell Division Research", subject: "Biology", dueDate: "Apr 25, 2025", status: "Completed" }
  ];
  
  const announcements = [
    { title: "Finals Schedule Posted", date: "Just now", content: "The schedule for final exams has been posted in the school portal." },
    { title: "Chemistry Lab Canceled", date: "1 hour ago", content: "Tomorrow's chemistry lab session has been canceled due to maintenance." },
    { title: "Study Group - Physics", date: "Yesterday", content: "A study group for the upcoming physics test will meet in Room 302 after school." }
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 pb-16">
        {/* Welcome header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hi, {studentName}</h1>
          <p className="text-gray-500 mt-1">Ready to continue your learning journey?</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next lesson preview */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle>Coming Up Next</CardTitle>
              <CardDescription>Your upcoming lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-lyri-light-purple to-lyri-soft-blue p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full text-lyri-purple">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{nextLesson.title}</h3>
                    <p className="text-gray-600 mb-3">{nextLesson.subject} with {nextLesson.teacher}</p>
                    
                    <div className="flex items-center text-sm space-x-6">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-600" />
                        <span>{nextLesson.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span>Duration: {nextLesson.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-lyri-purple hover:bg-lyri-dark-purple">Join Lesson</Button>
            </CardFooter>
          </Card>
          
          {/* Progress tracker */}
          <Card>
            <CardHeader>
              <CardTitle>My Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <span className="text-sm font-medium">{subject.progress}%</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full">
                      <div className={`absolute inset-0 bg-gray-200`}></div>
                      <div 
                        className={`absolute inset-0 ${subject.color}`} 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Notebook/assignments section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Assignments</CardTitle>
              <CardDescription>Manage your coursework</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {assignments.filter(a => a.status !== "Completed").map((assignment, index) => (
                    <div key={index} className="border p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="mr-4 p-2 bg-lyri-soft-yellow rounded-full">
                          <FileText size={20} className="text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">{assignment.subject} • Due {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          assignment.status === "Completed" ? "bg-green-100 text-green-800" : 
                          assignment.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {assignments.filter(a => a.status === "Completed").map((assignment, index) => (
                    <div key={index} className="border p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="mr-4 p-2 bg-green-100 rounded-full">
                          <FileText size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">{assignment.subject} • Due {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800">
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="all" className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="border p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className={`mr-4 p-2 rounded-full ${
                          assignment.status === "Completed" ? "bg-green-100" : 
                          assignment.status === "In Progress" ? "bg-blue-100" : 
                          "bg-gray-100"
                        }`}>
                          <FileText size={20} className={`${
                            assignment.status === "Completed" ? "text-green-600" : 
                            assignment.status === "In Progress" ? "text-blue-600" : 
                            "text-gray-600"
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">{assignment.subject} • Due {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          assignment.status === "Completed" ? "bg-green-100 text-green-800" : 
                          assignment.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Assignments</Button>
            </CardFooter>
          </Card>
          
          {/* Announcements section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles size={18} className="mr-2 text-yellow-500" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-lyri-purple hover:text-lyri-dark-purple">
                View All Announcements
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
