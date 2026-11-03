# SAP UI5 Capacity Dashboard

SAP UI5 frontend in webapp/ (XML view, controller, manifest, JSON model, sap.m and sap.ui.layout controls). SAPUI5 1.154.0 is loaded from the SAP CDN; internet access is required. The Node backend handles Excel parsing. No CAP/HANA deployment is configured yet.

Separate local project for daily R1 support and R2.1 hypercare capacity reviews. The existing heatmap application is unchanged.

## Start

From this directory:

```powershell
npm install
npm start
```

Open http://localhost:4010. When inside the current workspace, existing parent `xlsx` dependencies can also be used without reinstalling. Run `npm test` for import and calculation checks.

## Excel workflow

Download the Excel template in the dashboard, edit the Capacity sheet, and upload it. Required columns: Process Area, Resources, Daily Capacity (hrs), Incidents, SRs, OT(CR, ME, PRB), Defects, Capacity used for R1 (hours). Date is optional; use YYYY-MM-DD or an Excel date. A Date: preamble like the screenshot is also supported. If multiple sheets exist, Capacity is preferred; otherwise the first sheet is used. Summary TOTAL rows are ignored. Imports are validated completely before updating the screen. Blank numeric cells must be filled with 0.

Data is held in the browser tab; reload resets to clearly labelled sample data. Workbook bytes are parsed by the local server and not saved. This version has no shared database, authentication, or deployment configuration. It listens on the local loopback interface.

Every KPI and table total responds to filters. Available hours = capacity minus used hours; utilization = used / capacity × 100. At Capacity means used >= capacity. A zero capacity has N/A utilization. Used hours are imported, not inferred from fractional ticket counts, since ticket effort rules were not provided.

The screenshot sample sums to 387.9 used hours, 208 capacity hours, and 186.5% utilization using the displayed rows. Its displayed 173% total does not follow those inputs. This dashboard uses the calculated total.

## Resource contacts
Click a resource count to open module contacts. The provided roster and explicit process mappings are in webapp/model/roster.js. Default release: R1/R2.1. Select R2.2/R3.1 or All releases in the dialog. Workbook counts remain independent of roster counts. Shared entries may appear in multiple areas. Finance includes Finance-CO; Logistics includes EWM/IM and TM; Technical Dev includes the three Tech modules. TBA denotes an unfilled position. The unlabeled alternate-name column is not used as contact data.
