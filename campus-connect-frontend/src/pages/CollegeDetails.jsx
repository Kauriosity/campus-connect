import React from 'react';
import { useParams } from 'react-router-dom';

function CollegeDetails() {
  const { id } = useParams();
  const colleges = [
    {
      name: 'College A',
      location: 'City A',
      description: 'A prestigious institution known for its excellent academic programs.',
      rating: '4.5',
      bannerImage: 'https://via.placeholder.com/800x400',
      courses: ['Course 1', 'Course 2'],
    },
    {
      name: 'College B',
      location: 'City B',
      description: 'Renowned for its vibrant campus life and diverse student body.',
      rating: '4.2',
      bannerImage: 'https://via.placeholder.com/800x400',
      courses: ['Course 3', 'Course 4'],
    },
    // Add more dummy data
  ];

  const college = colleges[id];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={college.bannerImage} alt={college.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold">{college.name}</h2>
          <p className="text-gray-600 mt-2">{college.description}</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Courses Offered</h3>
            <ul className="list-disc list-inside">
              {college.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetails; 