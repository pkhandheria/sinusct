var modules = [];
var M;
var x;
var y;
var z;

var MODULE_NOYES = [ { val: "0", text: "No", checked: true }, { val: "1", text: "Yes" }	];

var images = [ "Recessus Frontalis", "Recessus Terminalis", "Concha Bullosa", "Keros Classification (Left)", "Paradoxic Curvature", "Interlamellar Cell", "Inferior to skull base (mm)", "Atelectatic", "Symmetric Fovea Ethmoidalis" ];

/*M = new Module( "Nasal Cycle", false );

x = new Question( "Nasal Cycle",
	[
		{ val: "0", text: "Equilibrium", checked: true },
		{ val: "1", text: "Left", report: "The nasal cycle is on the left." },
		{ val: "2", text: "Right", report: "The nasal cycle is on the right." }
	], "radio" );

M.addQuestion(x);
modules.push( M );*/

M = new Module( "Prior Operative Changes", false );

x = new Question( "Prior Operative Changes",
	[
		{ val: "0", text: "No", checked: true },
		{ val: "1", text: "Yes", report: "The patient has had prior sinonasal surgery." }
	], "radio" );

x.addDependent( new Question( "Septoplasty",
	[
		{ val: "1", text: "Yes", report: "Status post septoplasty." }
	]), "1" );
x.addDependent( new Question( "Uncinectomy", "Status post uncinectomy " ), "1" );
x.addDependent( new Question( "Anterior Partial Ethmoidectomy", "Status post anterior partial ethmoidectomy "), "1" );
x.addDependent( new Question( "Anterior Total Ethmoidectomy", "Status post anterior total ethmoidectomy "), "1" );
x.addDependent( new Question( "Posterior Partial Ethmoidectomy", "Status post posterior partial ethmoidectomy "), "1" );
x.addDependent( new Question( "Posterior Total Ethmoidectomy", "Status post posterior total ethmoidectomy "), "1" );
x.addDependent( new Question( "Sphenoidotomy", "Status post sphenoidotomy "), "1" );
x.addDependent( new Question( "Inferior Antrostomy", "Status post inferior antrostomy "), "1" );
x.addDependent( new Question( "Caldwell-Luc", "Status post Caldwell-Luc "), "1" );
x.addDependent( new Question( "Inferior Turbinectomy", "Status post inferior turbinectomy "), "1" );
x.addDependent( new Question( "Middle Turbinectomy", "Status post middle turbinectomy "), "1" );
x.addDependent( new Question( "Superior Turbinectomy", "Status post superior turbinectomy "), "1" );
x.addDependent( new Question( "Frontal Sinusotomy", "Status post frontal sinusotomy "), "1" );
x.addDependent( new Question( "Other Postoperative Changes", "", "text" ), "1" );
			
M.addQuestion(x);
modules.push( M );

M = new Module( "Nasal Septal Deviation", false );

x = new Question( "Nasal Septal Deviation >50%", "Greater than 50% nasal septal deviation " );

M.addQuestion(x);
modules.push( M );

/** FRONTAL SINUS **/
M = new Module( "Frontal Sinus" );

x = new Question( "Hypoplastic", "The frontal sinus is hypoplastic " );
M.addQuestion(x);

x = new Question( "Mucosal Thickening",
	[
		{ val: "0", text: "No", checked: true, report: "Frontal sinuses are clear." },
		{ val: "1", text: "Yes" }
	], "radio" );

x.addDependent( new Question( "Right",
	[
		{ val: "0", text: "Mild (<25%)", report: "Mild right and" },
		{ val: "1", text: "Moderate (26-75%)", report: "Moderate right and" },
		{ val: "2", text: "Severe (>75%)", report: "Severe left and" },
	], "radio" ), "1" );

x.addDependent( new Question( "Left",
	[
		{ val: "0", text: "Mild (<25%)", report: "mild left frontal sinus mucosal thickening." },
		{ val: "1", text: "Moderate (26-75%)", report: "moderate left frontal sinus mucosal thickening." },
		{ val: "2", text: "Severe (>75%)", report: "severe left frontal sinus mucosal thickening." },
	], "radio" ), "1" );

M.addQuestion( x );

x = new Question( "Osteitis", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Osteitis involving the frontal sinus ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Dehiscence/Erosion", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Location/Extent", "The frontal sinus is dehiscent ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Frontal Recess Obstruction", "The frontal recess is obstructed " );
M.addQuestion( x );

x = new Question( "Frontoethmoidal Cells", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "", "text" ), "1" );
M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );

modules.push( M );
/** END FRONTAL SINUS **/

/** UNCINATE PROCESS **/
M = new Module( "Uncinate Process" );

M.addQuestion( new Question( "Pneumatized", "The uncinate is pneumatized " ) );
M.addQuestion( new Question( "Atelectatic", "The uncinate process is atelectatic " ) );
M.addQuestion( new Question( "Laterally Deviated", "Lateral deviation of the uncinate process " ) );
M.addQuestion( new Question( "Other", "", "text" ) );

modules.push( M );
/** END UNCINATE PROCESS **/

/** INFUNDIBULUM **/
M = new Module( "Infundibulum" );

x = new Question( "Obstructed", "The infundibulum is obstructed " );
M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );

modules.push( M );
/** END INFUNDIBULUM **/

/** MIDDLE TURBINATE **/
M = new Module( "Middle Turbinate" );

M.addQuestion( new Question( "Paradoxic Curvature", "Paradoxic curvature of the middle turbinate " ) );
M.addQuestion( new Question( "Laterally Deviated", "Lateral deviation of the middle turbinate " ) );
M.addQuestion( new Question( "Concha Bullosa", "Concha bullosa " ) );
M.addQuestion( new Question( "Interlamellar Cell", "Interlamellar cell " ) );

M.addQuestion( new Question( "Other", "", "text" ) );

modules.push( M );
/** END MIDDLE TURBINATE **/

/** ANTERIOR ETHMOIDS **/
M = new Module( "Anterior Ethmoids" );

x = new Question( "Mucosal Thickening",
	[
		{ val: "0", text: "No", checked: true, report: "Anterior ethmoid sinuses are clear." },
		{ val: "1", text: "Yes" }
	], "radio" );

x.addDependent( new Question( "Right",
	[
		{ val: "0", text: "Mild (<25%)", report: "Mild right and" },
		{ val: "1", text: "Moderate (26-75%)", report: "Moderate right and" },
		{ val: "2", text: "Severe (>75%)", report: "Severe left and" },
	], "radio" ), "1" );

x.addDependent( new Question( "Left",
	[
		{ val: "0", text: "Mild (<25%)", report: "mild left anterior ethmoid mucosal thickening." },
		{ val: "1", text: "Moderate (26-75%)", report: "moderate left anterior ethmoid mucosal thickening." },
		{ val: "2", text: "Severe (>75%)", report: "severe left anterior ethmoid mucosal thickening." },
	], "radio" ), "1" );

M.addQuestion( x );

x = new Question( "Agger Nasi Cell", "Agger nasi cell present " );
M.addQuestion( x );

x = new Question( "Olfactory Cleft Opacified", "The olfactory cleft is opacified " );
M.addQuestion( x );

x = new Question( "Osteitis", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Osteitis involving the anterior ethmoids ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Bone Erosions", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Bony erosive changes involving the anterior ethmoids ^.", "text" ), "1" );
M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );

/** AEA SULCUS **/
x = new Module( "Anterior Ethmoid Artery" );
x.addQuestion( new Question( "Within bony skull base", "The AEA is within the bony skull base " ) );
y = new Question( "Inferior to skull base (mm)",
	[
		{ val: "", text: "R", report: "The AEA is ^ mm inferior to the skull base on the right." },
		{ val: "", text: "L", report: "The AEA is ^ mm inferior to the skull base on the left." }
	], "text");
y.report = "The AEA is inferior to the skull base ^R mm on the right and ^L mm on the left.";
x.addQuestion( y );

M.addQuestion( x );

/** BASAL LAMELLA **/
x = new Module( "Basal Lamella" );
x.addQuestion( new Question( "Intact", "The basal lamella is intact " ) );

y = new Question( "Orbital Indentions in Lamina Papyracea", MODULE_NOYES, "radio");
z = new Question( "Description", "", "text" );
y.addDependent( z, "1" );
x.addQuestion( y );

M.addQuestion( x );

/** SKULL BASE **/
x = new Module( "Skull Base" );

y = new Question( "Keros Classification (Left)",
	[
		{ val: "0", text: "I", report: "Keros type I on the left." },
		{ val: "1", text: "II", report: "Keros type II on the left." },
		{ val: "2", text: "III", report: "Keros type III on the left." }
	], "radio" );
x.addQuestion ( y );

y = new Question( "Keros Classification (Right)",
	[
		{ val: "0", text: "I", report: "Keros type I on the right." },
		{ val: "1", text: "II", report: "Keros type II on the right." },
		{ val: "2", text: "III", report: "Keros type III on the right." }
	], "radio" );
x.addQuestion ( y );

y = new Question( "Lateral Lamella Angulation (Left)",
	[
		{ val: "0", text: "Vertical", report: "Vertical left lateral lamella." },
		{ val: "1", text: "Horizontal", report: "Horizontal left lateral lamella." },
		{ val: "2", text: "Oblique", report: "Oblique left lateral lamella." }
	], "radio" );
x.addQuestion ( y );

y = new Question( "Lateral Lamella Angulation (Right)",
	[
		{ val: "0", text: "Vertical", report: "Vertical right lateral lamella." },
		{ val: "1", text: "Horizontal", report: "Horizontal right lateral lamella." },
		{ val: "2", text: "Oblique", report: "Oblique right lateral lamella." }
	], "radio" );
x.addQuestion ( y );

y = new Question( "Symmetric Fovea Ethmoidalis",
	[
		{ val: "0", text: "Yes", checked: true },
		{ val: "1", text: "No" }
	], "radio" );
y.addDependent( new Question( "Lower Side",
	[
		{ val: "0", text: "R", report: "The fovea ethmoidalis is asymmetrically lower on the right." },
		{ val: "1", text: "L", report: "The fovea ethmoidalis is asymmetrically lower on the left." }
	], "radio" ), "1" );
x.addQuestion ( y );

M.addQuestion( x );

modules.push( M );
/** END ANTERIOR ETHMOIDS **/

/** MAXILLARY SINUS **/
M = new Module( "Maxillary Sinus" );

x = new Question( "Pneumatization",
	[
		{ val: "0", text: "Symmetric", checked: true },
		{ val: "1", text: "Hypoplastic" }
	], "radio" );
	
x.addDependent( new Question( "Side", "Hypoplastic maxillary sinus " ), "1" );
x.addDependent( new Question( "Silent Sinus Syndrome", "Silent sinus syndrome " ), "1" );
M.addQuestion(x);

x = new Question( "Mucosal Thickening",
	[
		{ val: "0", text: "No", checked: true, report: "Maxillary sinuses are clear bilaterally." },
		{ val: "1", text: "Yes" }
	], "radio" );

x.addDependent( new Question( "Right",
	[
		{ val: "0", text: "Mild (<25%)", report: "Mild right and" },
		{ val: "1", text: "Moderate (26-75%)", report: "Moderate right and" },
		{ val: "2", text: "Severe (>75%)", report: "Severe left and" },
	], "radio" ), "1" );

x.addDependent( new Question( "Left",
	[
		{ val: "0", text: "Mild (<25%)", report: "mild left maxillary mucosal thickening." },
		{ val: "1", text: "Moderate (26-75%)", report: "moderate left maxillary mucosal thickening." },
		{ val: "2", text: "Severe (>75%)", report: "severe left maxillary mucosal thickening." },
	], "radio" ), "1" );

M.addQuestion( x );

x = new Question( "Accessory Ostia", "Accessory ostium present " );
M.addQuestion( x );

x = new Question( "Osteitis", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Osteitis involving the maxillary sinus ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Bone Erosions", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Bony erosive changes involving the maxillary sinus ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Orbital Floor Abnormality", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Infraorbital (Haller) Cell", "Infraorbital cell present " );
M.addQuestion( x );

x = new Question( "Odontogenic Issues", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Implants in maxillary sinus", "Dental implants in the maxillary sinus " ), "1");
x.addDependent( new Question( "Dental roots in maxillary sinus", "Dental roots in the maxillary sinus " ), "1");
x.addDependent( new Question( "Periapical lucencies", "Lucencies around the roots of the maxillary teeth " ), "1");
x.addDependent( new Question( "Bony erosion at edentulous sites", "Bony erosion at the edentulous sites " ), "1");

x.addDependent( new Question( "Edentulous",
	[
		{ val: "0", text: "Yes", report: "The patient is edentulous." }
	], "checkbox" ), "1" );

M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );
modules.push( M );
/** END MAXILLARY **/

/** POSTERIOR ETHMOID SINUS **/
M = new Module( "Posterior Ethmoid Sinus" );

x = new Question( "Mucosal Thickening",
	[
		{ val: "0", text: "No", checked: true, report: "The posterior ethmoids are clear." },
		{ val: "1", text: "Yes" }
	], "radio" );

x.addDependent( new Question( "Right",
	[
		{ val: "0", text: "Mild (<25%)", report: "Mild right and" },
		{ val: "1", text: "Moderate (26-75%)", report: "Moderate right and" },
		{ val: "2", text: "Severe (>75%)", report: "Severe left and" },
	], "radio" ), "1" );

x.addDependent( new Question( "Left",
	[
		{ val: "0", text: "Mild (<25%)", report: "mild left posterior ethmoid mucosal thickening." },
		{ val: "1", text: "Moderate (26-75%)", report: "moderate left posterior ethmoid mucosal thickening." },
		{ val: "2", text: "Severe (>75%)", report: "severe left posterior ethmoid mucosal thickening." },
	], "radio" ), "1" );

M.addQuestion( x );

M.addQuestion( new Question( "Sphenoethmoid (Onodi) Cell", "Sphenoethmoid cell is present " ) );

x = new Question( "Sphenoethmoid Recess Obstruction", "The sphenoethmoid recess is obstructed " );
M.addQuestion( x );

x = new Question( "Osteitis", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Osteitis involving the posterior ethmoids ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Bone Erosions", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Bony erosive changes involving the posterior ethmoids ^", "text" ), "1" );
M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );
modules.push( M );
/** END POSTERIOR ETHMOIDS **/

/** SPHENOIDS **/
M = new Module( "Sphenoid Sinus" );

M.addQuestion( new Question( "Pneumatized Anterior Clinoid", "Pneumatized anterior clinoid " ) );
M.addQuestion( new Question( "Pneumatized Pterygoid", "Pneumatized pterygoid " ) );

x = new Question( "Mucosal Thickening",
	[
		{ val: "0", text: "No", checked: true, report: "Sphenoid sinuses are clear." },
		{ val: "1", text: "Yes" }
	], "radio" );

x.addDependent( new Question( "Right",
	[
		{ val: "0", text: "Mild (<25%)", report: "Mild right and" },
		{ val: "1", text: "Moderate (26-75%)", report: "Moderate right and" },
		{ val: "2", text: "Severe (>75%)", report: "Severe left and" },
	], "radio" ), "1" );

x.addDependent( new Question( "Left",
	[
		{ val: "0", text: "Mild (<25%)", report: "mild left sphenoid mucosal thickening." },
		{ val: "1", text: "Moderate (26-75%)", report: "moderate left sphenoid mucosal thickening." },
		{ val: "2", text: "Severe (>75%)", report: "severe left sphenoid mucosal thickening." },
	], "radio" ), "1" );

M.addQuestion( x );

x = new Question( "Sella Turcica/Pituitary Fossa",
	[
		{ val: "0", text: "Normal", checked: true },
		{ val: "1", text: "Enlarged", report: "The sella is enlarged." }
	], "radio" );
M.addQuestion( x );

x = new Question( "Osteitis", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Osteitis involving the sphenoid sinus ^.", "text" ), "1" );
M.addQuestion( x );

x = new Question( "Bone Erosions", MODULE_NOYES, "radio" );
x.addDependent( new Question( "Description", "Bony erosive changes involving the sphenoid sinus ^.", "text" ), "1" );
M.addQuestion( x );

M.addQuestion( new Question( "Other", "", "text" ) );

x = new Module( "Septum Attachments" );
x.addQuestion( new Question( "Optic canal", "Sphenoid septum attaches to the optic canal " ) );
x.addQuestion( new Question( "Carotid canal", "Sphenoid septum attaches to the carotid canal " ) );
x.addQuestion( new Question( "Other", "", "text" ) );
M.addQuestion( x );

x = new Module( "Associated Dehiscences" );
x.addQuestion( new Question( "Optic canal/nerve", "The wall of the sphenoid sinus bordering the optic canal/nerve is dehiscent " ) );
x.addQuestion( new Question( "Carotid canal/artery", "The wall of the sphenoid sinus bordering the carotid canal/artery is dehiscent " ) );
x.addQuestion( new Question( "Sella",
	[
		{ val: "0", text: "No", checked: true },
		{ val: "1", text: "Yes", report: "The wall of the sphenoid sinus bordering the sella is dehiscent." }
	], "radio" ) );

x.addQuestion( new Question( "Other", "", "text" ) );
M.addQuestion( x );

modules.push( M );
/** END SPHENOIDS **/

function filterReport( x )
{
	var normal = "Frontal sinuses are clear. \n\nAnterior ethmoid sinuses are clear. \n\nMaxillary sinuses are clear bilaterally. \n\nThe posterior ethmoids are clear. \n\nSphenoid sinuses are clear. ";
	
	x = x.replace( normal, "No evidence of mucoperiosteal thickening or air-fluid levels. Patent ostiomeatal channels bilaterally, anterior and posteriorly.\n\nUnremarkable bony morphology." );
	
	x = x.replace( "Mild right and mild left", "Mild bilateral" );
	x = x.replace( "Moderate right and moderate left", "Moderate bilateral" );
	x = x.replace( "Severe right and severe left", "Severe bilateral" );
	
	return x;
}