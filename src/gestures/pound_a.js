const poundsA = new fp.GestureDescription("poundsA");

poundsA.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
poundsA.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
poundsA.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
poundsA.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
poundsA.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export default poundsA;
