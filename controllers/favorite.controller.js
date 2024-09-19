const { response } = require("express");
const Favorito = require("../models/favorite");

const obtenerFavoritosPorUsuario = async (req, res = response) => {
  const { userId } = req.params;

  try {
    const favoritos = await Favorito.find({ user: userId });

    if (!favoritos.length) {
      return res.status(404).json({
        header: [{ code: 404, error: "No hay favoritos para este usuario" }],
        body: [{}],
      });
    }

    res.status(200).json({
      header: [{ error: "NO ERROR", code: 200 }],
      body: favoritos,
    });
  } catch (error) {
    console.log("Error obteniendo favoritos ==> " + error);
    return res.status(500).json({
      header: [{ error: "Error en el servidor", code: 500 }],
      body: [{}],
    });
  }
};

const obtenerFavoritoPorId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const favorito = await Favorito.findById(id);

    if (!favorito) {
      return res.status(404).json({
        header: [{ code: 404, error: "El favorito no existe" }],
        body: [{}],
      });
    }

    res.status(200).json({
      header: [{ error: "NO ERROR", code: 200 }],
      body: favorito,
    });
  } catch (error) {
    console.log("Error obteniendo favorito ==> " + error);
    return res.status(500).json({
      header: [{ error: "Error en el servidor", code: 500 }],
      body: [{}],
    });
  }
};

const guardarFavorito = async (req, res = response) => {
  const { userId, favoriteId, type } = req.body;

  try {
    const existeFavorito = await Favorito.findOne({ user: userId, favoriteId });

    if (existeFavorito) {
      return res.status(400).json({
        header: [{ code: 400, error: "El favorito ya existe" }],
        body: [{}],
      });
    }

    const nuevoFavorito = new Favorito({ user: userId, favoriteId, type });
    await nuevoFavorito.save();

    res.status(201).json({
      header: [{ error: "NO ERROR", code: 201 }],
      body: nuevoFavorito,
    });
  } catch (error) {
    console.log("Error guardando favorito ==> " + error);
    return res.status(500).json({
      header: [{ error: "Error en el servidor", code: 500 }],
      body: [{}],
    });
  }
};

const actualizarFavorito = async (req, res = response) => {
  const { id } = req.params;

  try {
    const favorito = await Favorito.findById(id);

    if (!favorito) {
      return res.status(404).json({
        header: [{ code: 404, error: "El favorito no existe" }],
        body: [{}],
      });
    }

    await Favorito.findByIdAndDelete(id);

    res.status(200).json({
      header: [{ error: "NO ERROR", code: 200 }],
      body: { message: "Favorito eliminado" },
    });
  } catch (error) {
    console.log("Error actualizando favorito ==> " + error);
    return res.status(500).json({
      header: [{ error: "Error en el servidor", code: 500 }],
      body: [{}],
    });
  }
};

module.exports = {
  obtenerFavoritosPorUsuario,
  obtenerFavoritoPorId,
  guardarFavorito,
  actualizarFavorito,
};
