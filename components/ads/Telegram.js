import { FaTelegramPlane } from "react-icons/fa";

export default function Telegram() {
    return (
        <a
            href="https://t.me/terafetch"
            target="_blank"
            rel="noopener noreferrer"
            className="
                group
                fixed
                bottom-10
                left-0
                z-50
                flex
                items-center
                gap-2
                bg-sky-500
                text-white
                px-4
                py-3
                rounded-r-xl
                shadow-lg
                overflow-hidden
            "
        >


            <span
                className="
                    max-w-0
                    overflow-hidden
                    whitespace-nowrap
                    transition-all
                    duration-300
                    group-hover:max-w-[100px]
                "
            >
                Join Now
            </span>
            <FaTelegramPlane
                size={32}
                className=" 
                animate-bounce
                    transition-transform
                    duration-700
                    group-hover:rotate-[360deg]
                "
            />
        </a>
    );
}