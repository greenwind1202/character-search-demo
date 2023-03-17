import React from 'react';

import { API_URL } from '../../../utils/Constant';
import ResultTable from '../components/ResultTable';
import { Character } from '../models/CharacterModel';

export default function CharacterPage() {
  const [data, setData] = React.useState<Character[]>([]);

  const fetchAPIData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data && data.results) {
        data.results.forEach(function (item: any, index: number) {
          item.id = index + 1;
          item.height = parseInt(item.height);
        });
        setData(data.results);
      }
    } catch (e) {
      console.error('Error while fetching', e);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={fetchAPIData}
        >
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Fetch Data</span>
        </button>
      </div>
      {data.length > 0 && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResultTable data={data} />
        </main>
      )}
    </>
  );
}
