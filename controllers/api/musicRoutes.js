const router = require('express').Router();
const { Playlist, Song } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbPlaylistData = await Playlist.findAll({
      include: [
        {
          model: Song,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const Playlist = dbPlaylistData.map((playlist) =>
      playlist.get({ plain: true })
    );

    res.render('homepage', {
      playlist,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/playlist/:id', async (req, res) => {

  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

    try {
      const dbPlaylistData = await Playlist.findByPk(req.params.id, {
        include: [
          {
            model: Song,
            attributes: [
              'id',
              'title',
              'artist',
              'release_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const Playlist = dbPlaylistData.get({ plain: true });
      res.render('playlist', { playlist, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/song/:id', async (req, res) => {

  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

    try {
      const dbSongData = await Song.findByPk(req.params.id);

      const song = dbSongData.get({ plain: true });

      res.render('song', { song, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;