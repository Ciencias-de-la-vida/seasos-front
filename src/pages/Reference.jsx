import { Sidebar } from 'components/Nav/Sidebar';
import { Heading } from 'components/index'
import React, { useState } from 'react'

const references = [
  {
    author: "IUCN",
    year: "2023",
    title: "The IUCN Red List of Threatened Species",
    source: "Retrieved from",
    url: "https://www.iucnredlist.org"
  },
  {
    author: "Roberts, C. M., & Hawkins, J. P.",
    year: "2019",
    title: "Marine protection: The importance of preserving ocean ecosystems",
    source: "Marine Biology Review, 25(4), 456-475.",
    url: "https://doi.org/10.1016/j.mbr.2019.04.001"
  }
];

const ReferenceItem = ({ reference }) => (
  <div className="p-4 my-2 border-b border-gray-300">
    <p className="text-lg font-semibold">{reference.author} ({reference.year}).</p>
    <p className="italic">{reference.title}.</p>
    <p>{reference.source}</p>
    {reference.url && <a href={reference.url} className="text-blue-500 hover:underline">{reference.url}</a>}
  </div>
);

export const Reference = () => {
  return (
      <div className="container mx-auto p-4">
      <div className="bg-slate-600 shadow-md rounded-lg p-6">
        {references.map((ref, index) => (
          <ReferenceItem key={index} reference={ref} />
        ))}
      </div>
    </div>
  );
};
