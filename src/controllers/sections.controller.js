import Section from '../models/Section';

export const createSection = async (req, res) => {
    const { name, text, description } = req.body;

    const newSection = new Section({
        name,
        text,
        description
    });

    const sectionSaved = await newSection.save();
    res.json(sectionSaved);

    res.status(201).json(sectionSaved);
}

export const getSections = async (req, res) => {
    const sections = await Section.find();
    res.status(200).json(sections);
}


export const getSectionById = async(req,res) => {
    const section = await Section.findById(req.params.id);
    res.json(section);
}


export const updateSectionById = async(req,res) => {
    const { name, text, description } = req.body;
    const section = await Section.findByIdAndUpdate(req.params.id, {
        name,
        text,
        description,
    }, { new: true });
    res.status(200).json(section);

}


export const deleteSection = async (req, res) => {
    await Section.findByIdAndRemove(req.params.id);
    res.json({ message: 'Section deleted successfully' });
}

