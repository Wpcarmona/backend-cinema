const { Router } = require('express');
const { check } = require('express-validator');
const { 
  obtenerFavoritosPorUsuario, 
  obtenerFavoritoPorId, 
  guardarFavorito, 
  actualizarFavorito 
} = require('../controllers/favorite.controller');
const { validateCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/usuario/:userId', [
  check('userId', 'El ID de usuario es obligatorio').isMongoId(),
  validateCampos
], obtenerFavoritosPorUsuario);

router.get('/:id', [
  check('id', 'El ID del favorito es obligatorio').isMongoId(),
  validateCampos
], obtenerFavoritoPorId);

router.post('/', [
  check('userId', 'El ID de usuario es obligatorio').isMongoId(),
  check('favoriteId', 'El ID del favorito es obligatorio').not().isEmpty(),
  check('type', 'El tipo de favorito es obligatorio').not().isEmpty(),
  validateCampos
], guardarFavorito);

router.put('/:id', [
  check('id', 'El ID del favorito es obligatorio').isMongoId(),
  validateCampos
], actualizarFavorito);

module.exports = router;
