import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import backgroundImage from '../../../../assets/kidsbg.jpg';
function ChooseMonth() {
  const { childId , parentId} = useParams();

  const yearMonths = {
    1: [
      { month: 2, text: "1 month 0 days through 2 months 30 days" },
      { month: 4, text: "3 months 0 days through 4 months 30 days" },
      { month: 6, text: "5 months 0 days through 6 months 30 days" },
      { month: 8, text: "7 months 0 days through 8 months 30 days" },
      { month: 9, text: "9 months 0 days through 9 months 30 days" },
      { month: 10, text: "9 months 0 days through 10 months 30 days" },
      { month: 12, text: "11 months 0 days through 12 months 30 days" },
    ],
    2: [
      { month: 14, text: "13 months 0 days through 14 months 30 days" },
      { month: 16, text: "15 months 0 days through 16 months 30 days" },
      { month: 18, text: "17 months 0 days through 18 months 30 days" },
      { month: 20, text: "19 months 0 days through 20 months 30 days" },
      { month: 22, text: "21 months 0 days through 22 months 30 days" },
      { month: 24, text: "23 months 0 days through 25 months 15 days" },
    ],
    3: [
      { month: 27, text: "25 months 16 days through 28 months 15 days" },
      { month: 30, text: "28 months 16 days through 31 months 15 days" },
      { month: 33, text: "31 months 16 days through 34 months 15 days" },
    ],
    4: [
      { month: 36, text: "34 months 16 days through 38 months 30 days" },
      { month: 42, text: "39 months 0 days through 44 months 30 days" },
    ],
    5: [
      { month: 48, text: "45 months 0 days through 50 months 30 days" },
      { month: 54, text: "51 months 0 days through 56 months 30 days" },
      { month: 60, text: "57 months 0 days through 66 months 0 days" },
    ],
  };

  const years = Object.keys(yearMonths).map(Number);

  const [enabledButtons, setEnabledButtons] = useState(
    years.flatMap((year) => yearMonths[year].map(() => true))
  );
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (index) => {
    setClickedButton(index);
  };


  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center bg-gray-300" style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="container mx-auto p-8">
        <div className="absolute top-0 left-0 w-full bg-blue-950 bg-opacity-100 shadow-md p-4 z-10">
          <h1 className="text-4xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r bg-white mb-2">
            Choose Your Kid's Age in Months!
          </h1>
        </div>
        <div className="mt-32"> {/* Adjusted margin to account for fixed heading */}
          {years.map((year) => (
            <div key={year} className="mb-8 bg-blue-950 bg-opacity-90 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Year {year}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {yearMonths[year].map(({ month, text }, monthIndex) => {
                  const index = years
                    .slice(0, years.indexOf(year))
                    .flatMap((y) => yearMonths[y]).length + monthIndex;
                  const isButtonEnabled = enabledButtons[index];

                  return (
                    <div key={month} className="bg-white rounded-lg p-2 w-60 ml-10 border-r-orange-500 border-r-8 border-x-orange-500">
                      <Link
                        to={`/dashboard/${parentId}/${childId}/month/${month}/category/1`}
                      >
                        <button
                          className={`${
                            isButtonEnabled
                              ? "bg-white text-black " 
                              : "bg-gray-600 text-gray-700"
                          } font-semibold py-2 px-4 rounded-lg w-full`}
                          style={{ minWidth: "40px", minHeight: "60px" }}
                          disabled={!isButtonEnabled}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-bold">Month {month}</span>
                            <hr className="border-t-2 w-full mt-2 mb-2"/>
                            <span className="text-sm">{text}</span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseMonth;
