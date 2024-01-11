const poundsB = new fp.GestureDescription("poundsB");

poundsB.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.6);
poundsB.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
poundsB.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
poundsB.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
poundsB.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

export default poundsB;
