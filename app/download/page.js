import { genToken } from "@/lib/genToken";
import Converter from "@/components/url/Converter";

export default async function DownloadPage({ searchParams }) {
  // Await the async searchParams object
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div className="min-h-screen   bg-gradient-to-br from-pink-100 via-pink-200 to-orange-100 text-gray-800 flex flex-col items-center justify-center px-4 py-20 md:py-10">
      
      {/* Page Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-pink-600 text-center drop-shadow-md">
        🎬 Secure TeraBox Downloader
      </h1>

      {/* Converter Component */}
      <div className="w-full md:max-w-lg bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <Converter url={decodedUrl} token={token} />
      </div>

       
    </div>
  );
}
