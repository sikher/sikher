$data.IndexedDBConverter = {
    fromDb: {
        '$data.Byte': $data.Container.proxyConverter,
        '$data.SByte': $data.Container.proxyConverter,
        '$data.Decimal': $data.Container.proxyConverter,
        '$data.Float': $data.Container.proxyConverter,
        '$data.Int16': $data.Container.proxyConverter,
        '$data.Int64': $data.Container.proxyConverter,
        '$data.Integer': $data.Container.proxyConverter,
        '$data.Int32': $data.Container.proxyConverter,
        '$data.Number': $data.Container.proxyConverter,
        '$data.Date': $data.Container.proxyConverter,
        '$data.DateTimeOffset': $data.Container.proxyConverter,
        '$data.Time': $data.Container.proxyConverter,
        '$data.String': $data.Container.proxyConverter,
        '$data.Boolean': $data.Container.proxyConverter,
        '$data.Blob': function (b) { return b ? $data.Container.convertTo(b, $data.Blob) : b; },
        '$data.Array': function (arr) { if (arr === undefined) { return new $data.Array(); } return arr; },
        '$data.Object': $data.Container.proxyConverter,
        "$data.Guid": function (g) { return g ? $data.parseGuid(g).toString() : g; },
        '$data.GeographyPoint': function (g) { if (g) { return new $data.GeographyPoint(g); } return g; },
        '$data.GeographyLineString': function (g) { if (g) { return new $data.GeographyLineString(g); } return g; },
        '$data.GeographyPolygon': function (g) { if (g) { return new $data.GeographyPolygon(g); } return g; },
        '$data.GeographyMultiPoint': function (g) { if (g) { return new $data.GeographyMultiPoint(g); } return g; },
        '$data.GeographyMultiLineString': function (g) { if (g) { return new $data.GeographyMultiLineString(g); } return g; },
        '$data.GeographyMultiPolygon': function (g) { if (g) { return new $data.GeographyMultiPolygon(g); } return g; },
        '$data.GeographyCollection': function (g) { if (g) { return new $data.GeographyCollection(g); } return g; },
        '$data.GeometryPoint': function (g) { if (g) { return new $data.GeometryPoint(g); } return g; },
        '$data.GeometryLineString': function (g) { if (g) { return new $data.GeometryLineString(g); } return g; },
        '$data.GeometryPolygon': function (g) { if (g) { return new $data.GeometryPolygon(g); } return g; },
        '$data.GeometryMultiPoint': function (g) { if (g) { return new $data.GeometryMultiPoint(g); } return g; },
        '$data.GeometryMultiLineString': function (g) { if (g) { return new $data.GeometryMultiLineString(g); } return g; },
        '$data.GeometryMultiPolygon': function (g) { if (g) { return new $data.GeometryMultiPolygon(g); } return g; },
        '$data.GeometryCollection': function (g) { if (g) { return new $data.GeometryCollection(g); } return g; }
    },
    toDb: {
        '$data.Byte': $data.Container.proxyConverter,
        '$data.SByte': $data.Container.proxyConverter,
        '$data.Decimal': $data.Container.proxyConverter,
        '$data.Float': $data.Container.proxyConverter,
        '$data.Int16': $data.Container.proxyConverter,
        '$data.Int64': $data.Container.proxyConverter,
        '$data.Integer': $data.Container.proxyConverter,
        '$data.Int32': $data.Container.proxyConverter,
        '$data.Number': $data.Container.proxyConverter,
        '$data.Date': $data.Container.proxyConverter,
        '$data.DateTimeOffset': $data.Container.proxyConverter,
        '$data.Time': $data.Container.proxyConverter,
        '$data.String': $data.Container.proxyConverter,
        '$data.Boolean': $data.Container.proxyConverter,
        '$data.Blob': function(b){ return b ? $data.Blob.toString(b) : b; },
        '$data.Array': function (arr) { return arr ? JSON.parse(JSON.stringify(arr)) : arr; },
        '$data.Object': $data.Container.proxyConverter,
        "$data.Guid": function (g) { return g ? g.toString() : g; },
        '$data.GeographyPoint': function (g) { if (g) { return g; } return g; },
        '$data.GeographyLineString': function (g) { if (g) { return g; } return g; },
        '$data.GeographyPolygon': function (g) { if (g) { return g; } return g; },
        '$data.GeographyMultiPoint': function (g) { if (g) { return g; } return g; },
        '$data.GeographyMultiLineString': function (g) { if (g) { return g; } return g; },
        '$data.GeographyMultiPolygon': function (g) { if (g) { return g; } return g; },
        '$data.GeographyCollection': function (g) { if (g) { return g; } return g; },
        '$data.GeometryPoint': function (g) { if (g) { return g; } return g; },
        '$data.GeometryLineString': function (g) { if (g) { return g; } return g; },
        '$data.GeometryPolygon': function (g) { if (g) { return g; } return g; },
        '$data.GeometryMultiPoint': function (g) { if (g) { return g; } return g; },
        '$data.GeometryMultiLineString': function (g) { if (g) { return g; } return g; },
        '$data.GeometryMultiPolygon': function (g) { if (g) { return g; } return g; },
        '$data.GeometryCollection': function (g) { if (g) { return g; } return g; }
    }
};
