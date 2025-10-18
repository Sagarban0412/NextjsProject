import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from '@/components/Footer'
import FeatureCard from "@/components/FeatureCard";
const page = () => {
  const features = [
    {
    icon:"👥",
    title:"Interactive Learning",
    description:"Connect with teachers and students in real-time"
    },
    {
    icon:"📈",
    title:"Track Progress",
    description:"Monitor your learning journey with detailed analytics"
    },
    {
    icon:"📚",
    title:"Rich Course Content",
    description:" Access comprehensive courses across multiple subjects"
    },
]
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empower your learning journey with our comprehensive platform.
              Connect with teachers, access courses, and achieve your
              educational goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnTogether?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for effective online learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
              features.map((item,index)=>(
                 <div key={index}>
                  <FeatureCard key={index} icon={item.icon} title={item.title} description={item.description} />
                 </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Content Feed Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Learning Content
            </h2>
            <p className="text-gray-600">
              Discover new courses, resources, and updates from our community
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Teachers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and teachers already using LearnTogether
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/signup">Start Your Journey Today</Link>
          </Button>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default page;
