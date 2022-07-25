import Section from '../models/Section';

export const createSection = async (req, res) => {
    const { title, text, category } = req.body;

    const newSection = new Section({
        title,
        text,
        category
    });

    const sectionSaved = await newSection.save();
    res.status(201).json(sectionSaved);
}

export const getSections = async (req, res) => {
    const sections = await Section.find();
    res.status(200).json(sections);
}

export const getSectionById = async(req,res) => {
    const section = await Section.findById(req.params.id);
    res.status(200).json(section);
}

export const updateSectionById = async(req,res) => {
    const { title, text } = req.body;
    const section = await Section.findByIdAndUpdate(req.params.id, {
        title,
        text,
    }, { new: true });
    res.status(200).json(section);
}

export const deleteSection = async (req, res) => {
    await Section.findByIdAndRemove(req.params.id);
    res.json({ message: 'La sección se ha eliminado correctamente' });
}

