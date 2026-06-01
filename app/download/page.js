import { genToken } from "@/lib/genToken";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Converter from "@/components/url/Converter";

export default async function DownloadPage({ searchParams }) {
  // Await the async searchParams object
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div className=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#080b12',
      }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'orb-float 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'orb-float 10s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
      </div>
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
      <div className="w-full max-w-3xl  p-6 md:p-8">
        <Converter url={decodedUrl} token={token} />
      </div>
    </div>
  );
}
