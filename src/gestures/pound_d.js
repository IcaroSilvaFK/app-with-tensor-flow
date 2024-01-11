const poundsD = new fp.GestureDescription("poundsD");

poundsD.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 2);
poundsD.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0);
poundsD.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1);
poundsD.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1);
poundsD.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1);

export default poundsD;
