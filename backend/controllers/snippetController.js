const Snippet = require('../models/Snippet');

exports.getSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: snippets.length, data: snippets });
  } catch (error) {
    next(error);
  }
};

exports.getSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ success: false, error: 'Snippet not found' });
    }
    return res.status(200).json({ success: true, data: snippet });
  } catch (error) {
    next(error);
  }
};

exports.createSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.create(req.body);
    return res.status(201).json({ success: true, data: snippet });
  } catch (error) {
    next(error);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!snippet) {
      return res.status(404).json({ success: false, error: 'Snippet not found' });
    }
    return res.status(200).json({ success: true, data: snippet });
  } catch (error) {
    next(error);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({ success: false, error: 'Snippet not found' });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};