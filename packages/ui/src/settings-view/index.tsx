"use client";
import {
  UniRefund_SettingService_Bonds_BondDto,
  UniRefund_SettingService_CountrySettings_CountrySettingDto,
  UniRefund_SettingService_Groups_GroupDto,
  UniRefund_SettingService_Items_GroupItemDto,
} from "@ayasofyazilim/saas/SettingService";

import AutoForm, {
  AutoFormSubmit,
  AutoFormTypes,
  AutoFormUtils,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useEffect, useState } from "react";
import {
  JsonSchema,
  SchemaType,
  createZodObject,
} from "@repo/ayasofyazilim-ui/lib/create-zod-object";

export type AllowedValueTypeModelNameStringEnum =
  | "ToggleStringValueType"
  | "FreeTextStringValueType"
  | "SelectionStringValueType"
  | "BooleanValueType"
  | "NumericValueType"
  | ""
  | null;

export function isGroupDto(
  object: any
): object is UniRefund_SettingService_Groups_GroupDto {
  return "isEnabled" in object;
}

function createConfig(item: UniRefund_SettingService_Items_GroupItemDto) {
  let config = {
    [item.key]: {
      description: (
        <span className="text-muted-foreground">{item.description}</span>
      ),
      displayName: item.displayName,
    },
  };

  if (
    item?.valueType?.name &&
    convertValueTypeNameToFieldType(
      item.valueType.name as AllowedValueTypeModelNameStringEnum
    )
  ) {
    Object.assign(config, {
      [item.key]: {
        fieldType: convertValueTypeNameToFieldType(
          item.valueType.name as AllowedValueTypeModelNameStringEnum
        ),
        displayName: item.displayName,
      },
    });
  }
  return config;
}
function subField(item: UniRefund_SettingService_Items_GroupItemDto) {
  if (item.subItems && item.subItems.length > 0) {
    let subitemconfigs = item.subItems.map((subitem) => {
      if (subitem.subItems && subitem.subItems.length > 0) {
        let subsubitemconfigs = subitem.subItems.map((subsubitem) => {
          return createConfig(subsubitem);
        });
        return {
          [subitem.key]: {
            ...Object.assign({}, ...Object.values(subsubitemconfigs)),
            displayName: subitem.displayName,
            description: subitem.description,
          },
        };
      }
      return createConfig(subitem);
    });
    let subs = {
      [item.key]: {
        ...Object.assign({}, ...Object.values(subitemconfigs)),
        displayName: item.displayName,
        description: item.description,
      },
    };
    return subs;
  }
}
function createFieldConfig(
  object: UniRefund_SettingService_Groups_GroupDto
): AutoFormTypes.FieldConfig<{ [x: string]: any }> {
  let configs = object.items.map((item) => {
    if (item.subItems && item.subItems.length > 0) {
      return subField(item);
    } else {
      return createConfig(item);
    }
  });
  let config = Object.assign({}, ...Object.values(configs));
  return config;
}

type createBondType = {
  bonds: UniRefund_SettingService_Bonds_BondDto[];
  targetField: string;
  parentField?: string;
};
type bondType = {
  sourceField: string;
  targetField: string;
  type: AutoFormTypes.DependencyType;
  hasParentField: boolean;
  when: (val: any) => boolean;
};

function createSafeRegexp(val: any, pattern: string | undefined | null) {
  let x = val;
  try {
    x = new RegExp(pattern || "").test(val);
  } catch (error) {
    x = "";
  } finally {
    return x;
  }
}
function createBonds(sett: createBondType): bondType[] {
  return sett.bonds.map((bond) => {
    let sourceField = sett.parentField
      ? `${sett.parentField}.${bond.key}`
      : bond.key;

    let createdBond: bondType = {
      sourceField: sourceField ?? "", //bond.key is not nullable fix it
      targetField: sett.targetField,
      type: bond.type,
      hasParentField: sett.parentField ? true : false,
      when: (val: any) => createSafeRegexp(val, bond.pattern),
    };
    return createdBond;
  });
}
function createDependencies(
  group: UniRefund_SettingService_Groups_GroupDto
): AutoFormTypes.Dependency<{ [x: string]: any }>[] {
  let bonds = group.items.map((item) => {
    if (item.subItems && item.subItems.length > 0) {
      let subitembonds = item.subItems.map((subitem) => {
        return createBonds({
          bonds: subitem.bonds,
          targetField: subitem.key,
          parentField: item.key,
        });
      });
      let x = createBonds({
        bonds: item.bonds,
        targetField: item.key,
      });
      subitembonds.push(x);
      return subitembonds.filter((bond) => bond).flat();
    } else {
      if (item.bonds && item.bonds.length > 0) {
        return createBonds({
          bonds: item.bonds,
          targetField: item.key,
        });
      }
    }
  });
  // @ts-ignore
  return bonds.filter((x) => x).flat();
}
function convertValueTypeNameToFieldType(
  type: AllowedValueTypeModelNameStringEnum
) {
  switch (type) {
    case "ToggleStringValueType":
      return "switch";
    case "FreeTextStringValueType":
    case "SelectionStringValueType":
    default:
      return undefined;
  }
}
function convertValueTypeNameToSchemaType(
  type: AllowedValueTypeModelNameStringEnum | undefined
) {
  switch (type) {
    case "ToggleStringValueType":
      return "boolean";
    case "FreeTextStringValueType":
      return "string";
    case "SelectionStringValueType":
      return "select";
    case "BooleanValueType":
      return "boolean";
    default:
      return "string";
  }
}
function createProperties(
  item: UniRefund_SettingService_Items_GroupItemDto
): any {
  if (!item.valueType) return;
  if (item.subItems && item.subItems.length > 0)
    return { [item.key]: createSchema(undefined, item) };
  return {
    [item.key]: createJsonSchema(item),
  };
}
//Creates item & parent schema
function createSchema(
  group?: UniRefund_SettingService_Groups_GroupDto,
  item?: UniRefund_SettingService_Items_GroupItemDto
): SchemaType {
  var properties: any = {};
  if (group) {
    properties = Object.assign(
      {},
      ...group.items.map((item) => {
        return createProperties(item);
      })
    );
  } else if (item) {
    if (item.isApplicable && item.subItems && item.subItems.length > 0) {
      //appliable ve child var
    }
    if (item.subItems && item.subItems.length > 0)
      properties = Object.assign(
        {},
        ...item.subItems.map((subitem) => {
          return createProperties(subitem);
        })
      );
  }
  return {
    displayName:
      (group ? group.displayName : item ? item.displayName : "") ?? "",
    required: [group ? group.key : item ? item.key : ""],
    type: "object",
    properties: properties,
    additionalProperties: false,
  };
}
//Creates item schema
function createJsonSchema(
  item: UniRefund_SettingService_Items_GroupItemDto
): JsonSchema {
  let schema: JsonSchema = {
    type: convertValueTypeNameToSchemaType(
      item.valueType?.name as AllowedValueTypeModelNameStringEnum
    ),
    isRequired: item.isRequired ?? false,
    isReadOnly: item.isActive ?? false,
    maxLength: item.valueType?.validator?.properties?.maxValue,
    // default: item.defaultValue,
    // description: item.description ?? "asdasdasdasd",
    displayName: item.displayName ?? item.key,
  };
  if (item.valueType && item.valueType.name === "SelectionStringValueType") {
    schema = {
      ...schema,
      enum: item.valueType?.itemSource?.items?.map((x) => x.value),
    };
  }
  return schema;
}

export function SettingsView({
  list,
  resources,
  path,
}: {
  path: string;
  list: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  resources?: any;
}) {
  const [activeGroup, setActiveGroup] =
    useState<UniRefund_SettingService_Groups_GroupDto>(() => {
      const test = list.groups.find((x) => x.key === path);
      if (test) return test;
      return list.groups[0];
    });

  const [content, setContent] = useState<React.ReactElement>(() => {
    const group = activeGroup || list.groups[0];

    let schema = createSchema(group);
    const formSchema = createZodObject(
      schema,
      group.items.map((x) => x.key)
    ) as AutoFormUtils.ZodObjectOrWrapped;
    const fieldConfig = createFieldConfig(group);
    const dependencies = createDependencies(group);
    return Content(fieldConfig, formSchema, dependencies);
  });
  useEffect(() => {
    window.history.pushState(
      null,
      "",
      window.location.href.replace("home", list.groups[0].key)
    );
  }, []);

  function onSectionChange(sectionId: string) {
    console.log(sectionId); //sholdnt be called twice
    if (sectionId === activeGroup.key) return;
    const group =
      list.groups.find((s) => s.key === sectionId) || list.groups[0];
    let schema = createSchema(group);
    const formSchema = createZodObject(
      schema,
      group.items.map((x) => x.key)
    ) as AutoFormUtils.ZodObjectOrWrapped;
    const fieldConfig = createFieldConfig(group);
    const dependencies = createDependencies(group);

    setContent(Content(fieldConfig, formSchema, dependencies));

    window.history.pushState(
      null,
      "",
      window.location.href.replace(activeGroup.key, sectionId)
    );
    setActiveGroup(group);
  }
  console.log(resources);
  return (
    <SectionLayout
      sections={list.groups.map((group: any, index: any) => {
        return {
          id: group.key,
          name:
            resources?.SettingService?.texts[group.displayName] ??
            group.displayName,
        };
      })}
      defaultActiveSectionId={activeGroup?.key || list.groups[0].key}
      openOnNewPage={false}
      showContentInSamePage={true}
      onSectionChange={onSectionChange}
      vertical={true}
      className=""
      content={content}
      contentClassName="flex flex-col"
      // contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center h-full"
    />
  );
}

function Content(
  fieldConfig: AutoFormTypes.FieldConfig<{ [x: string]: any }>,
  formSchema: any,
  dependencies: AutoFormTypes.Dependency<{ [x: string]: any }>[]
) {
  return (
    <div className="flex flex-col gap-4 min-w-3xl mx-auto max-w-3xl w-full px-4 py-8">
      <AutoForm
        className="w-full"
        formSchema={formSchema}
        onParsedValuesChange={(e) => {}}
        onSubmit={(e) => {}}
        fieldConfig={fieldConfig}
        dependencies={dependencies}
      >
        <AutoFormSubmit className="float-right" />
      </AutoForm>
    </div>
  );
}