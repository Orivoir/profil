const fs = require('fs');
const path = require('path');

class Storage {

  constructor( root ) {

    this.root = root;

    this.dirnames = [];
  }

  createDir( dirname ) {

    if( this.dirnames.includes( dirname ) ) {

      throw new Error("dirname already exists");
    }

    const pathDir = path.join( this.root, dirname );

    if( !fs.existsSync( pathDir ) ) {

      fs.mkdirSync( pathDir );
    }

    if( !this.dirnames.includes( dirname ) ) {

      this.dirnames.push( dirname );
    }

  }

  getFilenames( dirname ) {

    if( !this.dirnames.includes( dirname ) ) {

      throw new Error( "dirname not exists" );
    }

    return fs.readdirSync(
      path.join( this.root, dirname ),
      {
        withFileTypes: true,
        encoding: "utf-8"
      }
    ).map( dirent => (
      typeof dirent === "object" ? dirent.name: dirent
    ) );
  }

  generateId( dirname ) {

    return this.getFilenames( dirname ).length;
  }

  createDoc( state, dirname ) {

    if( !this.dirnames.includes(dirname) ) {

      throw new Error("dirname not exists");
    }

    let id = this.generateId( dirname );

    state.id = id;

    const filename = `${id}.json`;

    fs.writeFileSync(
      path.join( this.root, dirname, filename ),
      JSON.stringify( state ),
      {
        encoding: "utf-8"
      }
    );

    return state;
  }

  updateDoc( newState, id, dirname ) {

    if( !this.dirnames.includes(dirname) ) {

      throw new Error("dirname not exists");
    }

    const state = this.getDocById( id, dirname );

    if( !state ) {
      return null;
    }

    Object.keys( newState ).forEach( key => {

      state[key] = newState[key];
    } );

    fs.writeFileSync(
      path.join(
        this.root, dirname, this.getFilenameById( id )
      ),
      JSON.stringify( state ),
      {
        encoding: "utf-8"
      }
    );

    return state;

  }

  removeDoc( id, dirname ) {

    const state = this.getDocById( id, dirname );

    if( !state ) {

      return null;
    }

    fs.unlinkSync(
      path.join(
        this.root, dirname, this.getFilenameById( id )
      )
    );

    return state;
  }

  getIdByFilename( filename ) {

    const id = filename.split('.')[0];

    return parseInt( id );
  }

  getFilenameById( id ) {

    return `${id}.json`;
  }

  getDocById( id, dirname ) {

    id = parseInt( id );

    const filenames = this.getFilenames( dirname );

    const filename = filenames.find( filename => (
      id === this.getIdByFilename( filename )
    ) );

    if( !filename ) {

      return null;
    }

    return this.getDocByPath(
      path.join( this.root, dirname, filename )
    );
  }

  getDocByPath( path ) {

    const stat = fs.statSync( path );

    if( fs.existsSync( path ) && stat.isFile( path ) ) {

      return JSON.parse(
        fs.readFileSync(
          path, {
            encoding: "utf-8"
          }
        )
      );

    } else {

      return null;
    }
  }

  getDocBy( matcher, dirname ) {

    const filenames = this.getFilenames( dirname );

    return filenames.map( filename => (
      this.getDocByPath( path.join(
        this.root, dirname, filename
      ) )
    ) ).filter( doc =>  (
      Object.keys( matcher ).filter( property => (
        doc[ property ] === matcher[ property ]
      ) ).length === Object.keys( matcher ).length
    ) );

  }

  getAllDoc( dirname ) {

    return this.getDocBy(
      [/* no constraint selector */],
      dirname
    );
  }

};


module.exports = Storage;