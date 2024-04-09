import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";

interface DataCardProps {
  label: string;
  value: number;
  shouldFormat?: boolean;
}

const DataCard = ({ label, value, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </span>
      </CardContent>
    </Card>
  );
};

export default DataCard;
