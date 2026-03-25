import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import type { ListingsQueryParams, ListingType } from "@/types/listings.types";
import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/constants/listings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListingsFiltersProps {
  initialValues: ListingsQueryParams;
  onApply: (values: ListingsQueryParams) => void;
  onClear: () => void;
}

export function ListingsFilters({
  initialValues,
  onApply,
  onClear,
}: ListingsFiltersProps) {
  const [keyword, setKeyword] = useState(initialValues.keyword ?? "");
  const [suburb, setSuburb] = useState(initialValues.suburb ?? "");
  const [propertyType, setPropertyType] = useState<ListingType | "ALL">(
    initialValues.property_type ?? "ALL"
  );
  const [priceMin, setPriceMin] = useState(
    initialValues.price_min ? String(initialValues.price_min) : ""
  );
  const [priceMax, setPriceMax] = useState(
    initialValues.price_max ? String(initialValues.price_max) : ""
  );
  const [bedroomsMin, setBedroomsMin] = useState(
    initialValues.bedrooms_min ? String(initialValues.bedrooms_min) : "ALL"
  );
  const [bathroomsMin, setBathroomsMin] = useState(
    initialValues.bathrooms_min ? String(initialValues.bathrooms_min) : "ALL"
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onApply({
      keyword: keyword.trim() || undefined,
      suburb: suburb.trim() || undefined,
      property_type: propertyType === "ALL" ? undefined : propertyType,
      price_min: priceMin ? Number(priceMin) : undefined,
      price_max: priceMax ? Number(priceMax) : undefined,
      bedrooms_min: bedroomsMin === "ALL" ? undefined : Number(bedroomsMin),
      bathrooms_min: bathroomsMin === "ALL" ? undefined : Number(bathroomsMin),
    });
  }

  function handleClear() {
    setKeyword("");
    setSuburb("");
    setPropertyType("ALL");
    setPriceMin("");
    setPriceMax("");
    setBedroomsMin("ALL");
    setBathroomsMin("ALL");

    onClear();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Filter Listings</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2 xl:col-span-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                placeholder="Search by title or description"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suburb">Suburb</Label>
              <Input
                id="suburb"
                placeholder="e.g. Northside"
                value={suburb}
                onChange={(event) => setSuburb(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={propertyType}
                onValueChange={(value) =>
                  setPropertyType(value as ListingType | "ALL")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All types</SelectItem>
                  {PROPERTY_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="priceMin">Min Price</Label>
              <Input
                id="priceMin"
                type="number"
                min={0}
                placeholder="e.g. 500000"
                value={priceMin}
                onChange={(event) => setPriceMin(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceMax">Max Price</Label>
              <Input
                id="priceMax"
                type="number"
                min={0}
                placeholder="e.g. 900000"
                value={priceMax}
                onChange={(event) => setPriceMax(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Min Bedrooms</Label>
              <Select value={bedroomsMin} onValueChange={setBedroomsMin}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Any</SelectItem>
                  {BEDROOM_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Min Bathrooms</Label>
              <Select value={bathroomsMin} onValueChange={setBathroomsMin}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Any</SelectItem>
                  {BATHROOM_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>

            <Button type="button" variant="outline" onClick={handleClear}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}