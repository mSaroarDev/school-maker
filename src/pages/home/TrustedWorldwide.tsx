import { GrMapLocation } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi";
import { LuTrendingUpDown } from "react-icons/lu";
import { TbChartHistogram } from "react-icons/tb";

const TrustedWorldwide = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500">Trusted Worldwide</p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">Trusted by over 600 million users and 10,000 teams</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Our rigorous security and compliance standards are at the heart of all we do. We work tirelessly to protect you and your customers.</p>
            <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                  Explore Legality Guide
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
              <div>
                <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                  Visit the Trust Center
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <LuTrendingUpDown size={30} className="mb-3" />
              <h3 className="mb-2 text-2xl font-bold dark:text-white">99.99% uptime</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">For Landwind, with zero maintenance downtime</p>
            </div>
            <div>
              <HiOutlineUsers size={30} className="mb-3" />
              <h3 className="mb-2 text-2xl font-bold dark:text-white">600M+ Users</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">Trusted by over 600 milion users around the world</p>
            </div>
            <div>
              <GrMapLocation size={30} className="mb-3" />
              <h3 className="mb-2 text-2xl font-bold dark:text-white">100+ countries</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">Have used Landwind to create functional websites</p>
            </div>
            <div>
              <TbChartHistogram size={30} className="mb-3" />
              <h3 className="mb-2 text-2xl font-bold dark:text-white">5+ Million</h3>
              <p className="font-light text-gray-500 dark:text-gray-400">Transactions per day</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedWorldwide;