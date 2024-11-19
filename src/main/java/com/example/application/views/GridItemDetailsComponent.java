package com.example.application.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Tag("grid-item-details")
@JsModule("./grid-item-details.ts")  // Link to the TypeScript file in the frontend folder
public class GridItemDetailsComponent extends Component {

    // Method to set JSON data as a string on the custom component
    public void setData(String jsonData) {
        // Pass the JSON string to the component’s 'data' property
        getElement().setProperty("data", jsonData);
    }
}
