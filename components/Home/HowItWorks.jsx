import { howItWorks } from "@/assets/data/HomePage";

const HowItWorks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {howItWorks.map((work, index) => {
        return (
          <div key={index} className="text-center border-solid border-gray-200 shadow-xs border-2 p-10 bg-teal-50/50 rounded-xl">
            <div className="bg-teal-300/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-700">{work.step}</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg ">{work.title}</h3>
            <p className="text-gray-600">{work.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HowItWorks;
