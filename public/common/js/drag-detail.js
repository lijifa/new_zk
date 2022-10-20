function createDrag(diagramJson,div = "ztt_dl",diagramType="hvac") {
	let myDiagram = new DiagramTool(div,{
		"diagramOper": 'detail', 
		"diagramType": diagramType,   
		"diagramData": JSON.parse(diagramJson),
	})
}