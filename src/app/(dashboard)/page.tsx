import StatsCards, {
  CardStatsWrapper,
  FormCards,
} from "@/components/CardStats";
import CreateFormButton from "@/components/CreateFormButton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { FormCardSkeleton } from "@/components/CardStats";

function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <CreateFormButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
        <Suspense
          fallback={[1,2,3,4].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
