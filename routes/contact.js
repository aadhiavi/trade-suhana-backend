const router = require("express").Router();
const contact = require("../models/contact");

router.post("/post", async (req, res) => {
    try {
        const { name, number, email, city, message } = req.body;
        const newContact = new contact({ name, number, email, city, message });

        await newContact.save();
        res.status(200).json({ message: "Data saved" });
    } catch (error) {
        res.status(400).json({ message: "Technical error occurred", error: error.message });
    }
});

router.get("/get", async (req, res) => {
    try {
        const contacts = await contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ message: "Technical error occurred", error: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, number, email, city, message } = req.body;

        const updatedContact = await contact.findByIdAndUpdate(
            id,
            { name, number, email, city, message },
            { new: true } 
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: "Technical error occurred", error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await contact.findByIdAndDelete(id);
        
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Technical error occurred", error: error.message });
    }
});

module.exports = router;


