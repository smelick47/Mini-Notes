<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" Language="C#" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!-- The following tells SharePoint to allow this page to be hosted in an IFrame -->
<WebPartPages:AllowFraming runat="server" />

<html>
<head>
    <!-- Add your CSS styles to the following file -->
    <link href="../../Content/themes/base/jquery-ui.css" rel="stylesheet" />
    <link href="../../Content/App.css" rel="stylesheet" />

    <script src="../../Scripts/jquery-1.8.3.min.js"></script>
    <script src="../../Scripts/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>

   
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
     <%--<script type="text/javascript" src="/_layouts/15/mQuery.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.ui.dialog.js"></script>--%>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <%--<script type="text/javascript" src="/_layouts/15/callout.js"></script>--%>


    <script src="../../Scripts/App.js"></script>
    <script src="../../Scripts/Pages/Notes.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                sharePointReady();
                notesReady();
            });
        });

    </script>


</head>

<body class="bodyapppart" >
    <div id="pinContainer" >
    </div>

</body>
</html>
