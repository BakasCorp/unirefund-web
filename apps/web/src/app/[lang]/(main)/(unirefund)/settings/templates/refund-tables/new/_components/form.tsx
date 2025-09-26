"use client";
import {FormDescription, useFieldArray, useForm} from "@/components/ui/form";
import {zodResolver} from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import React from "react";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Plus, Trash2} from "lucide-react";
import {
  UniRefundContractServiceRefundsRefundTableHeaderCreateDtoSchema,
  type RefundTableDetail,
  type UniRefundContractServiceRefundsRefundTableHeaderCreateDto,
} from "./schema";

// Individual row validation
const validateRow = (index: number, currentRow: RefundTableDetail, allRows: RefundTableDetail[]): string | null => {
  // Basic validation
  if (currentRow.maxValue <= currentRow.minValue) {
    return "Max value must be greater than min value";
  }

  // Sort all rows by minValue
  const sorted = [...allRows].sort((a, b) => a.minValue - b.minValue);
  const currentIndex = sorted.findIndex(
    (row) => row.minValue === currentRow.minValue && row.maxValue === currentRow.maxValue,
  );

  // First row must start from 0
  if (currentIndex === 0 && currentRow.minValue !== 0) {
    return "First row must start from 0";
  }

  // Check for continuity
  if (currentIndex > 0) {
    const previousRow = sorted[currentIndex - 1];
    if (currentRow.minValue !== previousRow.maxValue) {
      return `Min value must be ${previousRow.maxValue} to continue from previous row`;
    }
  }

  // Check for next row continuity
  if (currentIndex < sorted.length - 1) {
    const nextRow = sorted[currentIndex + 1];
    if (nextRow.minValue !== currentRow.maxValue) {
      return `Max value should be ${nextRow.minValue} to connect with next row`;
    }
  }

  // Check for overlaps with other rows
  for (let i = 0; i < allRows.length; i++) {
    if (i === index) continue;
    const otherRow = allRows[i];

    // Check if ranges overlap
    if (currentRow.minValue < otherRow.maxValue && currentRow.maxValue > otherRow.minValue) {
      return `Range conflicts with another row (${otherRow.minValue}-${otherRow.maxValue})`;
    }
  }

  return null;
};

export default function RefundTableForm() {
  const form = useForm<UniRefundContractServiceRefundsRefundTableHeaderCreateDto>({
    resolver: zodResolver(UniRefundContractServiceRefundsRefundTableHeaderCreateDtoSchema),
    defaultValues: {
      name: "",
      isDefault: false,
      isBundling: false,
      isTemplate: false,
      merchantId: null,
      refundTableDetails: [],
    },
    mode: "onChange", // Validate on every change
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "refundTableDetails",
  });

  const watchedRows = form.watch("refundTableDetails") || [];

  const addRow = () => {
    const lastRow = watchedRows[watchedRows.length - 1];
    const nextMinValue = lastRow.maxValue;

    append({
      vatRate: 0,
      minValue: nextMinValue,
      maxValue: nextMinValue + 1,
      refundAmount: 0,
      refundPercent: 0,
      isLoyalty: false,
    });
  };

  const removeRow = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: UniRefundContractServiceRefundsRefundTableHeaderCreateDto) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        data-testid="refund-table-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid size-full  grid-cols-12 gap-4 overflow-hidden">
        {/* Basic Information */}
        <div className="col-span-3 h-full">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input data-testid="refund-table-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Default</FormLabel>
                    <FormDescription>Set this refund table as default</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      data-testid="refund-table-is-default-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBundling"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Bundling</FormLabel>
                    <FormDescription>Enable bundling for this refund table</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      data-testid="refund-table-is-bundling-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTemplate"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Use as template</FormLabel>
                    <FormDescription>Assign this table to specific merchant</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      data-testid="refund-table-is-template-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="merchantId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Merchant ID</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="refund-table-merchant-id"
                      {...field}
                      value={field.value || ""}
                      placeholder="UUID format"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Refund Table Details */}
        <div className="col-span-9 flex h-full flex-col overflow-hidden border-l pl-4">
          <div className="mb-4 flex items-center justify-between">
            <FormLabel className="text-lg font-semibold">Refund Table Details</FormLabel>
            <Button
              type="button"
              onClick={addRow}
              variant="outline"
              size="sm"
              data-testid={`refund-table-details-add-row`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Row
            </Button>
          </div>

          {fields.length > 0 && (
            <div className="h-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>VAT Rate</TableHead>
                    <TableHead>Min Value</TableHead>
                    <TableHead>Max Value</TableHead>
                    <TableHead>Refund Amount</TableHead>
                    <TableHead>Refund Percent</TableHead>
                    <TableHead className="text-center">Is Loyalty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((row, index) => {
                    const rowError = validateRow(index, watchedRows[index], watchedRows);

                    return (
                      <React.Fragment key={row.id}>
                        <TableRow className={rowError ? "bg-red-50" : ""}>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.vatRate`}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      className="w-full"
                                      data-testid={`refund-table-details-vat-rate-${index}`}
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.minValue`}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      className="w-full"
                                      data-testid={`refund-table-details-min-value-${index}`}
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.maxValue`}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      className="w-full"
                                      data-testid={`refund-table-details-max-value-${index}`}
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.refundAmount`}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      className="w-full"
                                      data-testid={`refund-table-details-refund-amount-${index}`}
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.refundPercent`}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      className="w-full"
                                      data-testid={`refund-table-details-refund-percent-${index}`}
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`refundTableDetails.${index}.isLoyalty`}
                              render={({field}) => (
                                <FormItem className="flex items-center justify-center">
                                  <FormControl>
                                    <Switch
                                      data-testid={`refund-table-details-is-loyalty-${index}`}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              onClick={() => removeRow(index)}
                              variant="outline"
                              size="sm"
                              data-testid={`refund-table-details-remove-row-${index}`}
                              className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        {rowError && (
                          <TableRow>
                            <TableCell colSpan={7} className="p-0">
                              <div className="rounded bg-red-50 p-2 text-sm text-red-500">
                                Row {index + 1}: {rowError}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {fields.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No refund table details added yet. Click Add Row to get started.
            </div>
          )}

          <FormField
            control={form.control}
            name="refundTableDetails"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button 
        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isValid} className="px-8">
            Submit
          </Button>
        </div>
            */}
      </form>
    </Form>
  );
};