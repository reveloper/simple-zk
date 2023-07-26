import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { ZkSimple } from '../wrappers/ZkSimple';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('ZkSimple', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ZkSimple');
    });

    let blockchain: Blockchain;
    let zkSimple: SandboxContract<ZkSimple>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        zkSimple = blockchain.openContract(ZkSimple.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await zkSimple.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: zkSimple.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and zkSimple are ready to use
    });
});
