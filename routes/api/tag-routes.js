const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk( req.params.id, {
      include: [{ model: Product}, { model: ProductTag }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name, 
      },
      {
        where: req.params.id,
      }
    );

    if(!tagData) {
      res.status(404).json({ message: 'No tag with that id found'});
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
