import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-between p-10">
      <div className="w-full justify-center flex flex-col items-center">
        <h1 className="md:text-6xl text-4xl font-bold">Search for projects</h1>
        <div className="md:w-2/3 w-full py-10 relative">
          <Input placeholder="Search for projects"></Input>
          <Search className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
