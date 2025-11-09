import { genToken } from "@/lib/genToken";
import Converter from "@/components/url/Converter";
import { FaArrowLeft } from "react-icons/fa6";
export default async function DownloadPage({ searchParams }) {
  // Await the async searchParams object
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div className="min-h-screen   bg-gradient-to-br from-pink-100 via-pink-200 to-orange-100 text-gray-800 flex flex-col items-center  md:px-4  md:py-10">
      
      {/* Page Heading */}
      <h1 className="text-3xl sm:text-4xl  font-extrabold mb-6 text-pink-600 text-center drop-shadow-md">
      TeraBox Downloader
      </h1>
<div className="w-full h-20 flex items-center justify-center">
  <button className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 rounded-md bg-pink-500 text-white font-medium
    transition-all duration-300 ease-in-out
    hover:gap-4 hover:scale-105 hover:bg-pink-600">
    <FaArrowLeft className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
    Download another video
  </button>
</div>


      {/* Converter Component */}
      <div className="w-full md:max-w-[70vw]  md:bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl md:p-6">
        <Converter url={decodedUrl} token={token} />
      </div>

       
    </div>
  );
}
