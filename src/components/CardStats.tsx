import { GetFormStats, GetForms } from "@/actions/form";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Button } from "./ui/button";

export async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
};

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        subtext="All form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Total Submissions"
        subtext="All form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Submission Rate"
        subtext="Form visits that resulted in a submission"
        value={`${data?.submissionRate.toLocaleString()}%` || ""}
        loading={loading}
      />
      <StatsCard
        title="Bounce Rate"
        subtext="Visits without submitting"
        value={`${data?.bounceRate.toLocaleString()}%` || ""}
        loading={loading}
      />
    </div>
  );
}

export default StatsCards;

function StatsCard(props: {
  title: string;
  subtext: string;
  value: string;
  loading: boolean;
  className?: string;
}) {
  const { title, subtext, value, loading, className } = props;
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{subtext}</p>
      </CardContent>
    </Card>
  );
}

export function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

export async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

export function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{form.name}</span>
          <Badge variant={form.published ? "default" : "secondary"}>
            {form.published ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center justify-between gap-2 text-muted-foreground text-sm flex-wrap">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <span>Visits: {form.visits.toLocaleString()}</span>
              <span>Submissions: {form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate text-sm text-muted-foreground">
        {form.description || "No description provided"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Link href={`/forms/${form.id}`}>
            <Button variant="secondary">View submissions</Button>
          </Link>
        ) : (
          <Link href={`/builder/${form.id}`}>
            <Button variant="secondary">Edit form</Button>
          </Link>
        )}
        
      </CardFooter>
    </Card>
  );
}
