import { genToken } from "@/lib/genToken";
import Link from "next/link";
import { useHistory } from "@/components/history/HistoryProvider";
import HistoryList from "@/components/history/HistoryList";
import { FaArrowLeft } from "react-icons/fa6";
import Converter from "@/components/url/Converter";

export default async function DownloadPage({ searchParams }) {
  // Await the async searchParams object
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div className="relative w-full  overflow-hidden"
      style={{
        position: 'relative',
        minHeight: '100vh',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#080b12',
      }}>
      {/* Back button */}
      <div className="w-full flex justify-start my-8">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-glow transition-colors duration-200">
          <FaArrowLeft className="text-xl" />
          <span>Back</span>
        </Link>
      </div>

      {/* Page Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center gradient-text animate-fadeUp">
        TeraBox Downloader
      </h1>

      {/* Converter container */}
      <div className="w-full  md:flex items-center justify-center   md:p-8">
          <Converter url={decodedUrl} token={token} />
          <HistoryList />
      </div>
    </div>
  );
}
