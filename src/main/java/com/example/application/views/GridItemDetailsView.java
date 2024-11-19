package com.example.application.views;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Route(value = "", layout = MainLayout.class)
public class GridItemDetailsView extends Div {
    private GridItemDetailsComponent gridItemDetailsComponent;
    public GridItemDetailsView() {


        gridItemDetailsComponent = new GridItemDetailsComponent();

        // Generate and serialize data
        String jsonData = generateCropsAsJson();

        // Set the JSON string data on the component
        gridItemDetailsComponent.setData(jsonData);

        // Add the component to the view
        add(gridItemDetailsComponent);
    }

    // Method to generate mock data and serialize it as JSON
    private String generateCropsAsJson() {
        List<Map<String, Object>> crops = new ArrayList<>();

        for (int i = 1; i <= 100; i++) {
            Map<String, Object> crop = new HashMap<>();
            crop.put("id", i);
            crop.put("contamination_source", i % 2 == 0 ? "Agricultural" : "Industrial");
            crop.put("contamination_crop_condition", i % 2 == 0 ? "Severe" : "Moderate");
            crop.put("contamination_prevention", i % 2 == 0 ? "Advanced Methods" : "Basic Methods");
            crop.put("contamination_control", i % 2 == 0 ? "High" : "Minimal");
            crop.put("hive_oid", 100 + i);
            crop.put("child_data", generateChildData(i));

            crops.add(crop);
        }

        // Convert the list of maps to JSON using Jackson
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(crops);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "[]"; // Return an empty JSON array on error
        }
    }

    // Method to generate child data
    private List<Map<String, Object>> generateChildData(int parentId) {
        List<Map<String, Object>> childData = new ArrayList<>();

        int numberOfChildren = (int) (Math.random() * 6) + 5;
        for (int i = 0; i < numberOfChildren; i++) {
            Map<String, Object> child = new HashMap<>();
            child.put("oid", parentId * 10 + i);
            child.put("source_of_pollution_urdu", "آلودگی " + (i + 1) + " " + parentId);
            child.put("source_of_pollution_eng", "Pollution " + (i + 1) + " " + parentId);
            child.put("crop_acre", (int) (Math.random() * 100) + 10);
            child.put("is_multiple_crop_allowed", Math.random() > 0.5);
            child.put("crop_type_urdu", "فصل " + (i + 1) + " " + parentId);
            child.put("crop_type_eng", "Crop " + (i + 1) + " " + parentId);

            childData.add(child);
        }

        return childData;
    }
}
