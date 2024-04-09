import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import Chart from "./_components/chart";
import DataCard from "./_components/data-card";

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <section className="p-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </section>
      <Chart data={data} />
    </section>
  );
};

export default AnalyticsPage;
