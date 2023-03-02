import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { Role } from '../../user/role/role.enum';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../../user/dto/user.dto';

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);

    const userExists = await userRepository.findOne({
      where: [
        {
          email: 'admin@gmail.com',
        },
      ],
    });

    const createUser = async (user: UserDto, role: Role) => {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: await bcrypt.hash('test', 10),
        role: role,
      };

      if (!userExists) {
        userRepository.create(newUser);
        await userRepository.save(newUser);
      }
    };

    await createUser(
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        password: 'test',
      },
      Role.ADMIN,
    );
    await createUser(
      {
        firstName: 'BossFrontend',
        lastName: 'BossFrontend',
        email: 'bossFrontend@gmail.com',
        password: 'test',
      },
      Role.BOSS,
    );
    await createUser(
      {
        firstName: 'BossBackend',
        lastName: 'BossBackend',
        email: 'bossBackend@gmail.com',
        password: 'test',
      },
      Role.BOSS,
    );
    await createUser(
      {
        firstName: 'AQAJava',
        lastName: 'AQAJava',
        email: 'AqaJava@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'AQAJavaScript',
        lastName: 'AQAJavaScript',
        email: 'AQAJavaScript@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'AQADotNet',
        lastName: 'AQADotNet',
        email: 'AQADotNet@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'DevOps',
        lastName: 'DevOps',
        email: 'DevOps@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'PmJava',
        lastName: 'PmJava',
        email: 'PmJava@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'PmJavaScript',
        lastName: 'PmJavaScript',
        email: 'PmJavaScript@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
    await createUser(
      {
        firstName: 'DBDeveloper',
        lastName: 'DBDeveloper',
        email: 'DBDeveloper@gmail.com',
        password: 'test',
      },
      Role.USER,
    );
  }
}
