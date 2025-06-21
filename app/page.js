{
  /* others */
}
import "../assets/css/appComp/Common.css";
import poster from "../assets/images/poster.png";

{
  /* Components */
}
import Featuers from "@/components/Home/Featuers";
import Testimonials from "@/components/Home/Testimonials";

{
  /* Dependencies */
}
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HowItWorks from "@/components/Home/HowItWorks";

export default function Home() {
  return (
    <main className="container px-10 mx-auto lg:px-0  py-10 ">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2 lg:px-0 ">
          <h1 className="text-5xl md:text-7xl gradient-title mb-3">
            Organize Your Meetings
          </h1>
          <p className="text-md md:text-xl font-semibold text-gray-500 mb-7">
            Schedulla helps you save time by making scheduling quick and
            effortless. Create events set your availability, share your link,
            and let others pick the perfect time to meet.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant={"default_1"} className="text-lg ">
              Get Started
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/_next/static/media/poster.d8c433ec.png"
              fill
              style={{ objectFit: "cover" }}
              alt="poster"
            />
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-700">
          Key Features
        </h2>
        <Featuers />
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-700">
          Hear from Our Clients
        </h2>
        <Testimonials />
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-700">
          How It Works
        </h2>
        <HowItWorks />
      </div>

      <div className="mb-24 bg-teal-100 p-8 rounded-lg text-center shadow-2xs">
        <h2 className="text-2xl mb-6 font-semibold text-teal-900 text-shadow-sm">
          Get Started with Effortless Scheduling
        </h2>
        <p className="text-gray-700 mb-6">
          Make scheduling effortless. Set your availability, share your link,
          and let the bookings roll in – all in minutes!
        </p>
        <Link href={"/dashboard"}>
          <Button size={"lg"} variant={"secondary"} className="text-teal-700">
            Start For Free
            <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
