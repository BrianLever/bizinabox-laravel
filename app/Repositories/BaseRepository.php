<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BaseRepository
{
    public $model;

    /**
     * BaseRepository constructor.
     *
     * @throws \Exception
     */
    public function __construct()
    {
        return $this->makeModel();
    }

    /**
     * @return Model
     * @throws \Exception
     */
    public function makeModel(): Model
    {
        // Create new clear instance if created
        if ($this->model instanceof Model) {
            return app(get_class($this->model));
        }

        $model = app($this->model());

        if (!$model instanceof Model) {
            throw new ModelNotFoundException("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }

        $this->setModel($model);

        return $model;
    }

    /**
     * @return string
     */
    public function model(): string
    {
        return $this->model;
    }

    /**
     * @param Model $model
     *
     * @return $this
     */
    public function setModel(Model $model)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * @param string      $column
     * @param string|null $key
     *
     * @return mixed
     */
    public function pluck(string $column, string $key = null)
    {
        return $this->model->pluck($column, $key);
    }

    /**
     * @param array $columns
     *
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function get(array $columns = ['*'])
    {
        return $this->all($columns);
    }

    /**
     * @param string $field
     * @param        $value
     *
     * @return Model|null
     */
    public function first(string $field, $value)
    {
        $condition = ucfirst($field);
        
        if ($value) {
            return $this->model->{"where$condition"}($value)->first();
        }

        return null;
    }

    /**
     * @param array $attributes
     *
     * @return mixed
     */
    public function firstOrNew(array $attributes = [])
    {
        $model = $this->model->firstOrNew($attributes);

        return $model;
    }

    /**
     * @param array $attributes
     *
     * @return mixed
     */
    public function firstOrCreate(array $attributes = [])
    {
        $model = $this->model->firstOrCreate($attributes);

        return $model;
    }

    /**
     * @param       $field
     * @param null  $value
     * @param array $columns
     *
     * @return mixed
     */
    public function findByField($field, $value = null, $columns = ['*'])
    {
        $model = $this->model->where($field, '=', $value)->get($columns);

        return $model;
    }

    /**
     * @param array $where
     * @param array $columns
     *
     * @return mixed
     */
    public function findWhere(array $where, $columns = ['*'])
    {
        $this->applyConditions($where);
        $model = $this->model->get($columns);

        return $model;
    }

    /**
     * @param array $where
     */
    protected function applyConditions(array $where)
    {
        foreach ($where as $field => $value) {
            if (is_array($value)) {
                list($field, $condition, $val) = $value;
                $this->model = $this->model->where($field, $condition, $val);
            } else {
                $this->model = $this->model->where($field, '=', $value);
            }
        }
    }

    /**
     * @param array $columns
     *
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all(array $columns = ['*'])
    {
        if ($this->model instanceof Builder) {
            $results = $this->model->get($columns);
        } else {
            $results = $this->model->all($columns);
        }

        return $results;
    }

    /**
     * @param       $field
     * @param array $values
     * @param array $columns
     *
     * @return mixed
     */
    public function findWhereIn(string $field, array $values, array $columns = ['*'])
    {
        $model = $this->model->whereIn($field, $values)->get($columns);

        return $model;
    }

    /**
     * @param string $field
     * @param array  $values
     * @param array  $columns
     *
     * @return mixed
     */
    public function findWhereNotIn(string $field, array $values, array $columns = ['*'])
    {
        $model = $this->model->whereNotIn($field, $values)->get($columns);

        return $model;
    }

    /**
     * @param $data
     *
     * @return mixed
     */
    public function create(array $data)
    {
        $model = $this->model->newInstance($data);
        $model->save();

        return $model;
    }

    /**
     * @param Model $model
     * @param array $data
     *
     * @return Model
     */
    public function update(Model $model, array $data = [])
    {
        $model->fill($data);
        $model->save();

        return $model;
    }

    /**
     * @param array $attributes
     * @param array $values
     *
     * @return mixed
     */
    public function updateOrCreate(array $attributes, array $values = [])
    {
        $model = $this->model->updateOrCreate($attributes, $values);

        return $model;
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function delete($id)
    {
        $model = $this->find($id);
        $deleted = $model->delete();

        return $deleted;
    }

    /**
     * @param $relation
     *
     * @return $this
     */
    public function has($relation)
    {
        $this->model = $this->model->has($relation);

        return $this;
    }

    /**
     * @param $relations
     *
     * @return $this
     */
    public function with(array $relations)
    {
        $this->model = $this->model->with($relations);

        return $this;
    }

    /**
     * @param $relations
     *
     * @return $this
     */
    public function withCount(array $relations)
    {
        $this->model = $this->model->withCount($relations);

        return $this;
    }

    /**
     * @param $relation
     * @param $closure
     *
     * @return $this
     */
    public function whereHas($relation, $closure)
    {
        $this->model = $this->model->whereHas($relation, $closure);

        return $this;
    }

    /**
     * @param array $fields
     *
     * @return $this
     */
    public function hidden(array $fields)
    {
        $this->model->setHidden($fields);

        return $this;
    }

    /**
     * @param string $column
     * @param string $direction
     *
     * @return $this
     */
    public function orderBy(string $column, string $direction = 'asc')
    {
        $this->model = $this->model->orderBy($column, $direction);

        return $this;
    }

    /**
     * @param array $fields
     *
     * @return $this
     */
    public function visible(array $fields)
    {
        $this->model->setVisible($fields);

        return $this;
    }
}