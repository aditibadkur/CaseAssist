import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { HiX as XIcon } from 'react-icons/hi';
import { FiMessageCircle as MessageCircleIcon, FiCircle as CircleIcon } from 'react-icons/fi';

export default function Chatbot() {
  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
      <header className="bg-white text-[#1E293B] px-6 py-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="Department of Justice"
            width={40}
            height={40}
            className="rounded-full"
            style={{ aspectRatio: "40/40", objectFit: "cover" }}
          />
          <h1 className="text-xl font-bold">Department of Justice</h1>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20"
        >
          <XIcon className="w-5 h-5 text-[#1E293B]" />
          <span className="sr-only">Close</span>
        </Button>
      </header>
      <div className="flex-1 overflow-auto p-6 grid grid-cols-[240px_1fr] gap-6">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-[#1E293B] font-medium">
            <MessageCircleIcon className="w-5 h-5" />
            Department of Justice
          </div>
          <div className="space-y-2">
            <Link
              href="#"
              className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
              prefetch={false}
            >
              <CircleIcon className="w-3 h-3" />
              Judge Appointments
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
              prefetch={false}
            >
              <CircleIcon className="w-3 h-3" />
              Case Status
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
              prefetch={false}
            >
              <CircleIcon className="w-3 h-3" />
              Livestreams
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
              prefetch={false}
            >
              <CircleIcon className="w-3 h-3" />
              eCourts
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="rounded-full w-10 h-10 bg-[#475569] flex items-center justify-center text-2xl text-white">
              🤖
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-lg font-medium text-[#1E293B]">
                Hello! I'm the Department of Justice chatbot. How can I assist you today?
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                >
                  Judge Appointments
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                >
                  Case Status
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                >
                  Livestreams
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                >
                  eCourts
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="rounded-full w-10 h-10 bg-[#475569] text-white flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-lg font-medium text-[#1E293B]">
                Hi, I'm interested in learning more about the Department of Justice's judge appointment process.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="rounded-full w-10 h-10 bg-[#475569] flex items-center justify-center text-2xl text-white">
              🤖
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-lg font-medium text-[#1E293B]">
                Great, let me provide some information about the judge appointment process at the Department of Justice.
                The Department is responsible for nominating and appointing federal judges. The process involves several
                steps, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#1E293B]">
                <li>The President nominates a candidate for a federal judgeship.</li>
                <li>
                  The Senate Judiciary Committee holds a hearing to review the nominee's qualifications and background.
                </li>
                <li>The full Senate then votes to confirm or reject the nomination.</li>
                <li>If confirmed, the nominee is appointed to the federal judiciary.</li>
              </ul>
              <p className="text-[#1E293B]">
                You can find more detailed information about the judge appointment process on the Department of Justice
                website. Let me know if you have any other questions!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="rounded-full w-10 h-10 bg-[#475569] text-white flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-lg font-medium text-[#1E293B]">
                That's really helpful, thank you. I'm also curious about the Department of Justice's eCourts system. Can
                you tell me more about that?
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="rounded-full w-10 h-10 bg-[#475569] flex items-center justify-center text-2xl text-white">
              🤖
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-lg font-medium text-[#1E293B]">
                Absolutely, the Department of Justice's eCourts system is a comprehensive online platform that provides
                a range of services for the federal court system. Some of the key features of eCourts include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#1E293B]">
                <li>
                  Electronic filing of court documents, allowing attorneys and litigants to submit filings online.
                </li>
                <li>Access to case information and dockets, enabling users to track the status of their cases.</li>
                <li>
                  Livestreaming of court proceedings, allowing the public to observe hearings and trials remotely.
                </li>
                <li>
                  Integration with other DoJ systems, such as the Case Management/Electronic Case Files (CM/ECF) system.
                </li>
              </ul>
              <p className="text-[#1E293B]">
                eCourts is designed to make the federal court system more accessible and efficient. If you need more
                detailed information or have other inquiries, feel free to ask!
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white rounded-b-lg p-6 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-[#F1F5F9]/70 placeholder-[#1E293B]/60 text-[#1E293B] border-none focus:ring-0 focus:bg-[#F1F5F9]/90"
        />
        <Button size="sm" variant="default" className="bg-[#1E293B] text-white">
          Send
        </Button>
      </footer>
    </div>
  );
}
