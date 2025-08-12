import React, { useState } from "react";
import { DollarSign, Plus, Trash2 } from "lucide-react";

const CostingWorksheet = ({ items }) => {
  const [costs, setCosts] = useState(
    items.reduce((acc, item) => {
      acc[item.id] = {
        flour: 0,
        meat: 0,
        vegetables: 0,
        dairy: 0,
        otherToppings: 0,
        packaging: 0,
        label: 0,
        custom: [],
      };
      return acc;
    }, {})
  );

  const handleCostChange = (itemId, field, value, customIndex = null) => {
    const newCosts = { ...costs };
    if (customIndex !== null) {
      newCosts[itemId].custom[customIndex][field] = value;
    } else {
      newCosts[itemId][field] = parseFloat(value) || 0;
    }
    setCosts(newCosts);
  };

  const addCustomIngredient = (itemId) => {
    const newCosts = { ...costs };
    newCosts[itemId].custom.push({ name: "", cost: 0 });
    setCosts(newCosts);
  };

  const removeCustomIngredient = (itemId, index) => {
    const newCosts = { ...costs };
    newCosts[itemId].custom.splice(index, 1);
    setCosts(newCosts);
  };

  const calculateTotalCost = (itemId) => {
    const itemCosts = costs[itemId];
    const customCosts = itemCosts.custom.reduce(
      (total, ing) => total + ing.cost,
      0
    );
    return (
      itemCosts.flour +
      itemCosts.meat +
      itemCosts.vegetables +
      itemCosts.dairy +
      itemCosts.otherToppings +
      itemCosts.packaging +
      itemCosts.label +
      customCosts
    );
  };

  const renderCostFields = (item) => {
    const commonFields = [
      { name: "packaging", label: "Packaging" },
      { name: "label", label: "Label" },
    ];

    let categoryFields = [];
    if (item.category === "Sandwiches") {
      categoryFields = [
        { name: "flour", label: "Flour" },
        { name: "meat", label: "Meat" },
        { name: "vegetables", label: "Vegetables" },
        { name: "dairy", label: "Dairy" },
        { name: "otherToppings", label: "Other Toppings" },
      ];
    } else if (item.category === "Pizza") {
      categoryFields = [
        { name: "flour", label: "Dough/Flour" },
        { name: "meat", label: "Meat" },
        { name: "vegetables", label: "Vegetables" },
        { name: "dairy", label: "Cheese/Dairy" },
        { name: "otherToppings", label: "Sauce & Toppings" },
      ];
    }

    const allFields = [...categoryFields, ...commonFields];

    return allFields.map((field) => (
      <div key={field.name} className="flex items-center">
        <label className="w-1/2 text-sm text-slate-600">{field.label}</label>
        <div className="w-1/2 relative">
          <DollarSign
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="number"
            step="0.01"
            value={costs[item.id][field.name] || ""}
            onChange={(e) =>
              handleCostChange(item.id, field.name, e.target.value)
            }
            className="w-full pl-8 pr-2 py-1 border border-slate-300 rounded-md"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Costing Worksheet
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-slate-200 rounded-xl"
          >
            <h3 className="font-semibold text-slate-800 text-lg mb-2">
              {item.name}
            </h3>
            <div className="space-y-2">
              {renderCostFields(item)}

              {/* Custom Ingredients */}
              {costs[item.id].custom.map((customIng, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Custom Ingredient"
                    value={customIng.name}
                    onChange={(e) =>
                      handleCostChange(
                        item.id,
                        "name",
                        e.target.value,
                        index
                      )
                    }
                    className="w-1/2 px-2 py-1 border border-slate-300 rounded-md"
                  />
                  <div className="w-1/2 relative flex items-center">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Cost"
                      value={customIng.cost}
                      onChange={(e) =>
                        handleCostChange(
                          item.id,
                          "cost",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full pl-8 pr-2 py-1 border border-slate-300 rounded-md"
                    />
                    <button
                      onClick={() => removeCustomIngredient(item.id, index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addCustomIngredient(item.id)}
                className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus size={14} /> Add Custom Ingredient
              </button>
            </div>
            <div className="border-t mt-4 pt-2 flex justify-between items-center">
              <span className="font-semibold">Total Cost:</span>
              <span className="font-bold text-blue-600">
                ${calculateTotalCost(item.id).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostingWorksheet;
