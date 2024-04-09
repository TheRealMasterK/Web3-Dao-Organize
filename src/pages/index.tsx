import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "@/components/layouts/layout-static";

import { useAuth } from "@/lib/use-auth";

const Landing = () => {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.push("/board");
    }
  }, [user, router]);

  return (
    <Layout>
      <main>
        <section className="gradient-bg pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:mt-6 xl:text-6xl">
                    Trello brings all your tasks, teammates, and tools together
                  </h1>
                  <p className="mt-3 text-base text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Keep everything in the same place—even if your team isn’t.
                  </p>
                </div>
              </div>
              <div className="-mb-16 mt-12 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                  <Image
                    src="/TrelloUICollage.png"
                    alt="My Image"
                    width={2720}
                    height={2400}
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">A better way to send money.</h2>
            <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
              <div>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                    <i className="bi bi-puzzle section-icon"></i>
                  </div>
                  <p className="mt-6 text-lg font-semibold leading-8 tracking-tight ">
                    Integrations
                  </p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-500">
                  Connect the apps your team already uses into your Trello
                  workflow or add a Power-Up to fine-tune your specific needs.{" "}
                </dd>
              </div>

              <div>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                    <i className="bi bi-gear section-icon"></i>
                  </div>
                  <p className="mt-6 text-lg font-semibold leading-8 tracking-tight ">
                    Butler Automation
                  </p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-500">
                  No-code automation is built into every Trello board. Focus on
                  the work that matters most and let the robots do the rest.{" "}
                </dd>
              </div>

              <div>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                    <i className="bi bi-search-heart section-icon"></i>
                  </div>
                  <p className="mt-6 text-lg font-semibold leading-8 tracking-tight ">
                    Trello Enterprise
                  </p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-500">
                  The productivity tool teams love, paired with the features and
                  security needed for scale.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="gradient-bg rounded-3xl px-6 py-10 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Get started with Trello today
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-primary-100">
                Join over 2,000,000 teams worldwide that are using Trello to get
                more done.
              </p>
            </div>
            <div className="mt-12 sm:w-full sm:max-w-md lg:ml-8 lg:mt-0 lg:flex-1">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-3 text-base font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0"
                >
                  Sign up - it's free!
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <div className="mt-10 flex justify-center space-x-10">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <i className="bi bi-instagram footer-icon"></i>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <i className="bi bi-facebook footer-icon"></i>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Linkedin</span>
              <i className="bi bi-linkedin footer-icon"></i>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <i className="bi bi-twitter footer-icon"></i>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">YouTube</span>
              <i className="bi bi-youtube footer-icon"></i>
            </a>
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            This website is a redesign of Trello. Trello is a registered
            trademark of its respective owner. This website is not affiliated
            with Trello in any way.
          </p>
        </footer>
      </main>
    </Layout>
  );
};

export default Landing;
