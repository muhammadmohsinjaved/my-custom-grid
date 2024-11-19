import '@vaadin/form-layout';
import '@vaadin/grid';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GridActiveItemChangedEvent } from '@vaadin/grid';
import { gridRowDetailsRenderer } from '@vaadin/grid/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/grid/vaadin-grid-sort-column.js';



interface ChildData {
    oid: number;
    source_of_pollution_urdu: string;
    source_of_pollution_eng: string;
    crop_acre: number;
    is_multiple_crop_allowed: boolean;
    crop_type_urdu: string;
    crop_type_eng: string;
}

interface Crop {
    id: number;
    contamination_source: string;
    contamination_crop_condition: string;
    contamination_prevention: string;
    contamination_control: string;
    hive_oid: number;
    child_data: ChildData[];
}
@customElement('grid-item-details')
export class GridItemDetails extends LitElement {
    protected override createRenderRoot() {
        const root = super.createRenderRoot();
        applyTheme(root);
        return root;
    }

    @state()
    private items: Crop[] = [];

    @state()
    private detailsOpenedItem: Crop[] = [];

    @property({ type: String })
    set data(jsonData: string) {
        try {
            const parsedData = JSON.parse(jsonData);
            if (Array.isArray(parsedData)) {
                this.items = [...parsedData]; // Make a shallow copy to ensure reactivity
                this.requestUpdate();
            } else {
                console.error('Data format incorrect:', parsedData);
            }
        } catch (e) {
            console.error('Error parsing data:', e);
        }
    }

    protected override render() {
        return html`
            <style>
                /* Ensure the vaadin-grid takes up 100% of the screen height */
                :host {
                    display: block;
                    height: 100%;
                }
                .vaadin-grid {
                    height: 100vh;  /* Full viewport height */
                    width: 100%;    /* Full width */
                }

                .custom-table {
                    width: 100% !important;
                    border-collapse: collapse;
                    border: 3px solid #ddd;
                    margin: 20px 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                .custom-table th,
                .custom-table td {
                    padding: 12px;
                    text-align: left;
                }
                .custom-table th {
                    background-color: #858383;
                    color: white;
                }
                .custom-table tr {
                    border-bottom: 1px solid #ddd;
                }
                .custom-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>

            <vaadin-grid
                    style="height: 90vh;"
                    theme="row-stripes"
                    .items="${this.items}"
                    .detailsOpenedItems="${this.detailsOpenedItem}"
                    @active-item-changed="${(event: GridActiveItemChangedEvent<Crop>) => {
                        const crop = event.detail.value;
                        this.detailsOpenedItem = crop ? [crop] : [];
                        // Log all child data when a row is selected
                        if (crop) {
                            console.log('Child Data:', crop.child_data);
                        }
                    }}"
                    ${gridRowDetailsRenderer<Crop>((crop) => html`
                        <vaadin-form-layout .responsiveSteps="${[{ minWidth: '0', columns: 3 }]}">
                            <table class="custom-table">
                                <thead>
                                <tr>
                                    <th>Source of Pollution (English)</th>
                                    <th>Crop Acre</th>
                                    <th>Crop Type (English)</th>
                                    <th>Source of Pollution (Urdu)</th>
                                    <th>Crop Type (Urdu)</th>
                                    <th>Multiple Crops Allowed</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${crop.child_data.map(item => html`
                                    <tr>
                                        <td>${item.source_of_pollution_eng}</td>
                                        <td>${item.crop_acre}</td>
                                        <td>${item.crop_type_eng}</td>
                                        <td>${item.source_of_pollution_urdu}</td>
                                        <td>${item.crop_type_urdu}</td>
                                        <td>${item.is_multiple_crop_allowed ? 'Yes' : 'No'}</td>
                                    </tr>
                                `)}
                                </tbody>
                            </table>
                        </vaadin-form-layout>
                    `, [])}
            >
                <vaadin-grid-selection-column></vaadin-grid-selection-column>

                <vaadin-grid-sort-column
                        path="contamination_source"
                        header="Contamination Source"
                ></vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                        path="contamination_crop_condition"
                        header="Condition"
                ></vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                        path="contamination_prevention"
                        header="Prevention"
                ></vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                        path="contamination_control"
                        header="Control"
                ></vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                        path="hive_oid"
                        header="OID"
                ></vaadin-grid-sort-column>
            </vaadin-grid>
        `;
    }
}
