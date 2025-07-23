// src/pages/admin/Dashboard.tsx

import { useState } from "react";
import Layout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const applicantStats = [
  { name: "Jan", applicants: 120, visits: 2200 },
  { name: "Feb", applicants: 90, visits: 1800 },
  { name: "Mar", applicants: 140, visits: 2500 },
  { name: "Apr", applicants: 130, visits: 2300 },
  { name: "May", applicants: 100, visits: 2100 },
  { name: "Jun", applicants: 160, visits: 2900 },
  { name: "Jul", applicants: 150, visits: 3000 },
];

const jobPostsOverview = [
  { name: "IT", total: 20, new: 4 },
  { name: "Marketing", total: 15, new: 2 },
  { name: "HR", total: 10, new: 1 },
  { name: "Finance", total: 8, new: 0 },
];

const recentActivities = [
  {
    id: 1,
    user: "Admin",
    action: "created",
    item: "Job post for Frontend Developer",
    timestamp: "1 hour ago",
  },
  {
    id: 2,
    user: "Nguyen Van A",
    action: "applied",
    item: "Backend Developer",
    timestamp: "3 hours ago",
  },
  {
    id: 3,
    user: "Admin",
    action: "approved",
    item: "Company profile: TechCorp",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    user: "Le Thi B",
    action: "updated CV",
    item: "Senior Designer",
    timestamp: "2 days ago",
  },
  {
    id: 5,
    user: "Admin",
    action: "deleted",
    item: "Old job post: Data Analyst",
    timestamp: "3 days ago",
  },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range as any)}
              >
                {range} gần nhất
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Số lượng ứng viên</CardDescription>
              <CardTitle className="text-3xl">128</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium mr-1">↑ 15%</span>{" "}
                so với cùng kỳ
              </p>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="pb-2">
              <CardDescription>Lượt truy cập website</CardDescription>
              <CardTitle className="text-3xl"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium mr-1">↑ 22%</span>{" "}
                vs last period
              </p>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tin tuyển dụng</CardDescription>
              <CardTitle className="text-3xl">58</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium mr-1">↑ 10%</span>{" "}
                vs last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Applicants & Visits Trend</CardTitle>
              <CardDescription>Monthly report</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicantStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="applicants" stroke="#4f46e5" strokeWidth={2} />
                  <Line dataKey="visits" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Posts by Department</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobPostsOverview} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total" fill="#4f46e5" />
                  <Bar dataKey="new" name="New" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.user}{" "}
                        <span className="text-muted-foreground font-normal">
                          {activity.action} {activity.item}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  Post a new job
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  View applications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Export reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Invite employer
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Site settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
