#!/usr/bin/env node --no-warnings

import assert from "node:assert";
import { DatabaseSync } from "node:sqlite";
import test, { afterEach, beforeEach } from "node:test";

// ==============================
// データベース、テーブル、レコード、クエリを用意

const database = new DatabaseSync(":memory:");
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
const insert = database.prepare("INSERT INTO data (key, value) VALUES (?, ?)");
insert.run(1, "dog");
insert.run(2, "cat");
insert.run(3, "mouse");
const queryAll = database.prepare("SELECT * FROM data ORDER BY key");
const query = database.prepare("SELECT * FROM data WHERE key = ? ORDER BY key");
const del = database.prepare("DELETE FROM data WHERE key = ?");

// ==============================
// トランザクションを開始する関数
// 大抵のライブラリで実装されている

async function tx(
	cb: (
		commit: () => Promise<void>,
		rollback: () => Promise<void>,
	) => Promise<void>,
) {
	database.exec("BEGIN TRANSACTION;");
	await cb(
		async () => database.exec("COMMIT;"),
		async () => database.exec("ROLLBACK;"),
	);
}

// ==============================
// テストケース

test("取得", async () => {
	await tx(async (commit, rollback) => {
		assert.deepEqual(query.get(1), { key: 1, value: "dog" });
		await rollback();
	});
});

test("削除", async () => {
	await tx(async (commit, rollback) => {
		del.run(1);
		assert.equal(query.get(1), undefined);
		await rollback();
	});
});

test("全部取得", async () => {
	await tx(async (commit, rollback) => {
		assert.equal(queryAll.all().length, 3);
		await rollback();
	});
});
