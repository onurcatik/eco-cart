import { cn } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
  // Ensure the value has two decimal places
  const stringValue = value.toFixed(2);

  // Split into integer and float parts
  const [intValue, floatValue] = stringValue.split('.');

  return <p className={cn('text-2xl text-blue-500', className)}>
    <span className="text-2xl text-blue-500">$</span>
    {intValue}
    <span className="text-2xl text-blue-500">.{floatValue}</span>
  </p>;
};

export default ProductPrice;
