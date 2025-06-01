import React from "react";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

const galleryItemsData: GalleryItem[] = [
  {
    id: 1,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQF4Wegh7XXgVw/feedshare-shrink_1280/feedshare-shrink_1280/0/1728942689918?e=1751500800&v=beta&t=bHBFBxGTOjhEdJiQ_iQdRNObhGz-4411KuROzIN-EEw",
    alt: "Mountain View 1",
  },
  {
    id: 2,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQHkR3l3uvbJvA/feedshare-shrink_1280/feedshare-shrink_1280/0/1728942690953?e=1751500800&v=beta&t=4A-7BqttoUwv0NwebAG3hJ-GqU4WPKAqWKMXGZdZ2qY",
    alt: "Cityscape 2",
  },
  {
    id: 3,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFuxlOplh1u3Q/feedshare-shrink_1280/feedshare-shrink_1280/0/1728940285794?e=1751500800&v=beta&t=hkf_P7hhsO2xx4yctgO0b_E-9CYicNbCZ6d_DvjEKCU",
    alt: "Lake Braies 3",
  },
  {
    id: 4,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFiVwDI4v-imA/feedshare-shrink_1280/feedshare-shrink_1280/0/1728940285799?e=1751500800&v=beta&t=tgb116MhMKuOomwHYTqZ0t1DIocpylrrXX5dRijRCeo",
    alt: "Vintage Camera 4",
  },
  {
    id: 5,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGqnvTlEWd4WA/feedshare-shrink_1280/B4DZPRSOQvHYAo-/0/1734383036186?e=1751500800&v=beta&t=2okc21iIRvIXWQ5xITk63nNGxUYPrnOCkdVyCXMuMrc",
    alt: "Forest Trail 5",
  },
  {
    id: 6,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQFV_tuSiUktAA/feedshare-shrink_1280/B4DZPRSOQjG0Ak-/0/1734383036152?e=1751500800&v=beta&t=unhoCbB6FQqHr_DnVAPLfYMmikwTuts04jDv_lyp07o",
    alt: "Beach Sunset 6",
  },
  {
    id: 7,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQHM4q1GDVpLZA/feedshare-shrink_2048_1536/B4DZUVYeUIG4As-/0/1739820493491?e=1751500800&v=beta&t=0IBVgpg1GlJR50MKdLpvdpK_ICGoNsfluL2yd22sim4",
    alt: "Desert Dunes 7",
  },
  {
    id: 8,
    src: "https://media.licdn.com/dms/image/v2/D4D22AQGvA63KzfUuYw/feedshare-shrink_2048_1536/B4DZUVYeUGHYAo-/0/1739820496642?e=1751500800&v=beta&t=XCzAXhI-17aTS5ap3YuAmL-mFKqgdWKjpgWDlo0HxeI",
    alt: "Desert Dunes 7",
  },
];

const VisualDiary: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Gallery</h1>
          <p className="text-gray-400">
            A collection of moments frozen in time
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {galleryItemsData.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-md">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualDiary;
