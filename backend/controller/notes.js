const Notes = require("../model/notes");

const handleNotesPostRoute = async (req, res) => {
  try {
    console.log(req.user);
    const body = req.body;
    console.log(body);
    if (!body || !body.title || !body.description) {
      return res.status(400).json({ msg: "all the field are required" });
    }

    const response = await Notes.create({
      title: body.title,
      description: body.description,
      userId: req.user.userId,
    });
    return res
      .status(200)
      .json({ msg: "notes created successfully", notes: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.msg });
  }
};

const handleNotesGetRoute = async (req, res) => {
  try {
    // get all the notes that the user has created
    console.log("User from token:", req.user);
    const { userId } = req.user;
    console.log(req.user);
    // get the notes with the userid
    const notes = await Notes.find({ userId: userId });
    console.log(notes);
    if (!notes) {
      return res.status(400).json({ msg: "notes not found" });
    }
    return res.send(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
};

const handleNotesUpdateRoute = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedNote = await Notes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedNote) {
      return res.status(404).json({ msg: "note not found" });
    }
    return res.json(updatedNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
};

const handleNotesDeleteRoute = async (req, res) => {
    try {
        const id = req.params.id;
       const DeletedNote = await Notes.findByIdAndDelete(id);
       if(!DeletedNote){
         return res.status(404).json({msg : "notes not found"});
       }
       return res.status(200).json({msg : "deleted note "}, DeletedNote);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : "server error"});
    }
};
module.exports = {
  handleNotesPostRoute,
  handleNotesGetRoute,
  handleNotesDeleteRoute,
  handleNotesUpdateRoute,
};
